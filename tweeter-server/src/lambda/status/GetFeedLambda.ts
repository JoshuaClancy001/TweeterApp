import {StatusService} from "../../model/service/StatusService";
import {StatusItemRequest} from "tweeter-shared/dist/model/net/request/StatusItemRequest";
import {StatusItemResponse} from "tweeter-shared";





export const handler = async (request: StatusItemRequest): Promise<StatusItemResponse> => {
    const statusService = new StatusService();
    const [items, hasMore] = await statusService.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, request.lastItem);
    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    };
}

