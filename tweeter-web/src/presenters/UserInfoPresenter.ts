import {FollowService} from "../model/service/FollowService";
import {AuthToken, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";


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
        isFollwer: boolean) {
        await this.doFailureReportingOperation("get follower status", async () => {
            if (currentUser === displayedUser) {
                isFollwer = false;
            } else {
                isFollwer = await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
            }
        });
    };

    public async setNumbFollowees(authToken: AuthToken, displayedUser: User , followeeCount: number, setFolloweeCount: (number: number) => void) {
        this.doFailureReportingOperation("get followees count", async () => {
            followeeCount = await this.followService.getFolloweeCount(authToken, displayedUser);
            setFolloweeCount(followeeCount);
        });
    };

    public async setNumbFollowers (authToken: AuthToken, displayedUser: User, followerCount: number, setFollowerCount: (number: number) => void) {
        this.doFailureReportingOperation("get followers count", async () => {
            followerCount = await this.followService.getFollowerCount(authToken, displayedUser);
            setFollowerCount(followerCount);

        });
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
        this.doFailureReportingOperation("follow user", async () => {
            isLoading(true);
            this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

            const [followerCount, followeeCount] = await this.followService.follow(
                authToken!,
                displayedUser!
            );

            isFollower(true)
            numFollowers(followerCount)
            numFollowees(followeeCount)
        });
            this.view.clearLastInfoMessage();
            isLoading(false);
    }

    public async unfollowDisplayedUser(
        authToken: AuthToken,
        isLoading: (boolean: boolean) => void,
        displayedUser: User,
        isFollower: (boolean: boolean) => void,
        setFolloweeCount: (number: number) => void,
        setFollowerCount: (number: number) => void){
        this.doFailureReportingOperation("unfollow user", async () => {
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
            await this.setNumbFollowees(authToken, displayedUser, followeeCount, setFolloweeCount)
            await this.setNumbFollowers(authToken, displayedUser, followerCount,setFollowerCount)
        });

            this.view.clearLastInfoMessage();
            isLoading(false)
    }

}