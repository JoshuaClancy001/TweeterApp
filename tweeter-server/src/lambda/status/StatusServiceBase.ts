import {StatusService} from "../../model/service/StatusService";
import {StatusDto} from "tweeter-shared";

export class StatusServiceBase {
    private statusService: StatusService;

    constructor(){
        this.statusService = new StatusService();
    }

    async postStatus(token: string, status: StatusDto){
        await this.statusService.postStatus(token, status);
        return {success: true, message: null};
    }

    async getFeed(token: string, userAlias: string, pageSize: number, lastItem: StatusDto){
        return await this.getItems(this.statusService.loadMoreFeedItems(token, userAlias, pageSize, lastItem));
    }

    async getStory(token: string, userAlias: string, pageSize: number, lastItem: StatusDto){
        return await this.getItems(this.statusService.loadMoreStoryItems(token, userAlias, pageSize, lastItem));
    }

    private async getItems(action: Promise<[StatusDto[], boolean]>){
        const [items, hasMore] = await action;
        return {success: true, message: null, items: items, hasMore: hasMore};
    }

}