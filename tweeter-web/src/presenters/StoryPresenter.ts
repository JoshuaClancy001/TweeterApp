import {StatusService} from "../model/service/StatusService";
import {StatusItemView, StatusItemPresenter} from "./StatusItemPresenter";
import {AuthToken} from "tweeter-shared";

export const PAGE_SIZE = 10;


export class StoryPresenter extends StatusItemPresenter{
    private statusService: StatusService;
    constructor(view: StatusItemView) {
        super(view)
        this.statusService = new StatusService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string){
       await this.doFailureReportingOperation("load story items", async () => {
           const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
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