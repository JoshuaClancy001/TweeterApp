import {StatusService} from "../../model/service/StatusService";
import {StatusDto, UserDto, UserItemResponse} from "tweeter-shared";
import {FollowService} from "../../model/service/FollowService";

export class FollowServiceBase {
    private followService: FollowService;

    constructor(){
        this.followService = new FollowService();
    }

    async follow(token: string, userToFollow: UserDto){
        return await this.followAction(this.followService.follow(token, userToFollow));
    }

    async unfollow(token: string, userToUnfollow: UserDto){
        return await this.followAction(this.followService.unfollow(token, userToUnfollow));
    }

    private async followAction(action: Promise<[followerCount: number, followeeCount: number]>){
        const [followerCount, followeeCount] = await action;
        return {success: true, message: null, followerCount: followerCount, followeeCount: followeeCount};
    }

    async getFollowerCount(token: string, userAlias: UserDto){
        return await this.getCount(this.followService.getFollowerCount(token, userAlias));
    }

    async getFolloweeCount(token: string, userAlias: UserDto){
        return await this.getCount(this.followService.getFolloweeCount(token, userAlias));
    }

    private async getCount(action: Promise<number>){
        const count = await action
        return {success: true, message: null, count: count};
    }

    async getFollowers(token: string, userAlias: string, pageSize: number, lastItem: UserDto):Promise<UserItemResponse>{
        return await this.getMore(this.followService.loadMoreFollowers(token, userAlias, pageSize, lastItem));
    }

    async getFollowees(token: string, userAlias: string, pageSize: number, lastItem: UserDto): Promise<UserItemResponse>{
        return await this.getMore(this.followService.loadMoreFollowees(token, userAlias, pageSize, lastItem));
    }

    async getMore(action: Promise<[UserDto[], boolean]>){
        const [items, hasMore] = await action;
        return {success: true, message: null, items: items, hasMore: hasMore};
    }

    async getIsFollowerStatus(token: string, user: UserDto, selectedUser: UserDto){
        const isFollower = await this.followService.getIsFollowerStatus(token, user, selectedUser);
        return {success: true, message: null, isFollower: isFollower};
    }



}