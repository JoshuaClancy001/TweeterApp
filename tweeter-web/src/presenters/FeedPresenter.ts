import {StatusService} from "../model/service/StatusService";
import {StatusItemView, StatusItemPresenter} from "./StatusItemPresenter";
import {AuthToken, Status} from "tweeter-shared";
import {PAGE_SIZE} from "./ItemPresenter";





export class FeedPresenter extends StatusItemPresenter{

    protected getItemDescription(): string {
        return "load more feed items";
    }

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
        return this.service.loadMoreFeedItems(
            authToken!,
            userAlias,
            PAGE_SIZE,
            this.lastItem
        );
    }
}