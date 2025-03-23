import {AuthToken,PostStatusRequest, Status, StatusItemRequest} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";

export class StatusService {
    private serverFAcade: ServerFacade = new ServerFacade();
    public async loadMoreStoryItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>{
        const statusDto = lastItem?.dto
        const request: StatusItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: statusDto || null
        }

        return this.serverFAcade.getMoreFeedItems(request);
    };

    public async loadMoreFeedItems  (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]>{
        const statusDto = lastItem?.dto
        const request: StatusItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: statusDto || null
        }

        return this.serverFAcade.getMoreFeedItems(request);
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void>{
        const request: PostStatusRequest = {
            token: authToken.token,
            status: newStatus.dto
        }
        await this.serverFAcade.postStatus(request)
    };


}