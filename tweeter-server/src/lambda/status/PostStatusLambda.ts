import {PostStatusRequest, TweeterResponse} from "tweeter-shared";
import {StatusServiceBase} from "./StatusServiceBase";

const statusService: StatusServiceBase = new StatusServiceBase()

export const handler = async (request: PostStatusRequest): Promise<TweeterResponse> => {
    return await statusService.postStatus(request.token, request.status)
}