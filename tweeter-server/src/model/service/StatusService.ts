import {AuthToken, FakeData, Status, StatusDto} from "tweeter-shared";

export class StatusService {
    public async loadMoreStoryItems(
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]>{
        return this.getFakeData(lastItem, pageSize, userAlias);
    };

    public async loadMoreFeedItems  (
        authToken: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]>{
        return this.getFakeData(lastItem, pageSize, userAlias);
    };

    private async getFakeData(lastItem: StatusDto, pageSize: number, userAlias: string):Promise<[StatusDto[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDto(lastItem), pageSize);
        const dtos = items.map((status: Status) => status.dto);
        return [dtos, hasMore];
    }

    public async postStatus(
        token: string,
        newStatus: StatusDto
    ): Promise<void>{
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server to post the status
    };


}