import {FollowService} from "../model/service/FollowService";
import {AuthToken, User} from "tweeter-shared";
import {MessageView, Presenter, View} from "./Presenter";


export interface UserInfoView extends MessageView{}
export class UserInfoPresenter extends Presenter<UserInfoView> {
    private followService: FollowService;

    constructor(view: UserInfoView) {
        super(view)
        this.followService = new FollowService();
    }

    public async setIsFollowerStatus(
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User,
        isFollwer: boolean,

    ) {
        try {
            if (currentUser === displayedUser) {
                isFollwer = false;
            } else {
                isFollwer = await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to determine follower status because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowees(
        authToken: AuthToken,
        displayedUser: User ,
        followeeCount: number

    ){
        try {
            followeeCount = await this.followService.getFolloweeCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followees count because of exception: ${error}`
            );
        }
    };

    public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User,
        followerCount: number
    ) {
        try {
            followerCount = await this.followService.getFollowerCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to get followers count because of exception: ${error}`
            );
        }
    };

    public async followDisplayedUser(
        user: User,
        authToken: AuthToken,
        displayedUser: User,
        isLoading: (boolean: boolean) => void,
        isFollower: (boolean: boolean) => void,
        numFollowers: (number: number) => void,
        numFollowees: (number: number) => void,
    ) {
        try {
            isLoading(true);
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.followService.follow(
                authToken!,
                displayedUser!
            );

            isFollower(true)
            numFollowers(followerCount)
            numFollowees(followeeCount)

        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to follow user because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            isLoading(false);
        }
    }

    public async unfollowDisplayedUser(
        authToken: AuthToken,
        isLoading: (boolean: boolean) => void,
        displayedUser: User,
        isFollower: (boolean: boolean) => void,


    ) {
        try {
            isLoading(true);
            this.view.displayInfoMessage(
                `Unfollowing ${displayedUser!.name}...`,
                0
            );

            const [followerCount, followeeCount] = await this.followService.unfollow(
                authToken!,
                displayedUser!
            );

            isFollower(false)
            this.setNumbFollowees(authToken,displayedUser,followeeCount)
            this.setNumbFollowers(authToken,displayedUser,followerCount)
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to unfollow user because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            isLoading(false)
        }
    }

}