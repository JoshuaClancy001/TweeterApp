import {AuthToken, FakeData, User, UserItemRequest} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";

export class FollowService {
    private serverFacade: ServerFacade = new ServerFacade();
    public async loadMoreFollowers (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]>{
        const userDTO = lastItem?.dto
        const request: UserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: userDTO || null
        }
        return this.serverFacade.getMoreFollowers(request);
    };

    public async loadMoreFollowees(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]>{
        const userDTO = lastItem?.dto
        const request: UserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: userDTO || null
        }
        return this.serverFacade.getMoreFollowees(request);
    };

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean>{
        // TODO: Replace with the result of calling server
        return FakeData.instance.isFollower();
    };

    public async getFolloweeCount(
        authToken: AuthToken,
        user: User
    ): Promise<number>{
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFolloweeCount(user.alias);
    };

    public async getFollowerCount (
        authToken: AuthToken,
        user: User
    ): Promise<number>{
        // TODO: Replace with the result of calling server
        return FakeData.instance.getFollowerCount(user.alias);
    };

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.getFolloweeCount(authToken, userToFollow);

        return [followerCount, followeeCount];
    };

    public unfollow = async (
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followerCount: number, followeeCount: number]> => {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await this.getFolloweeCount(authToken, userToUnfollow);

        return [followerCount, followeeCount];
    };
}