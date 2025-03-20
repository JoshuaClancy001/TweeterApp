import {AuthToken, FakeData, Status, StatusItemRequest} from "tweeter-shared";
import {ServerFacade} from "../../network/ServerFacade";
import {StatusDto} from "tweeter-shared/dist/model/dto/StatusDto";

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
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server to post the status
    };


}