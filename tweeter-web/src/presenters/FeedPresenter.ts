import {StatusService} from "../model/service/StatusService";
import {StatusItemView, StatusItemPresenter} from "./StatusItemPresenter";
import {AuthToken} from "tweeter-shared";

export const PAGE_SIZE = 10;


export class FeedPresenter extends StatusItemPresenter{
    private statusService: StatusService;

    constructor(view: StatusItemView) {
        super(view)
        this.statusService = new StatusService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string){
        await this.doFailureReportingOperation("load more feed items", async () => {
            const [newItems, hasMore] = await this.statusService.loadMoreFeedItems(
                authToken!,
                userAlias,
                PAGE_SIZE,
                this.lastItem
            );

            this.hasMoreItems = hasMore
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        });
    };
}