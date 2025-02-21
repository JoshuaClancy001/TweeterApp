import {FollowService} from "../model/service/FollowService";
import {UserItemPresenter, UserItemView} from "./UserItemPresenter";
import {AuthToken} from "tweeter-shared";
export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemPresenter{
    private followService: FollowService;

    public constructor(view: UserItemView) {
        super(view);
        this.followService = new FollowService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string ){
        await this.doFailureReportingOperation("load followers", async () => {
            const [newItems, hasMore] = await this.followService.loadMoreFollowers(
                authToken!,
                userAlias,
                PAGE_SIZE,
                this.lastItem
            );

            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        });
    };
}