import {StatusService} from "../../model/service/StatusService";
import {StatusItemRequest} from "tweeter-shared/dist/model/net/request/StatusItemRequest";
import {StatusItemResponse} from "tweeter-shared";
import {StatusServiceBase} from "./StatusServiceBase";

const statusService = new StatusServiceBase();

export const handler = async (request: StatusItemRequest): Promise<StatusItemResponse> => {
    return await statusService.getStory(request.token, request.userAlias, request.pageSize, request.lastItem);
}

