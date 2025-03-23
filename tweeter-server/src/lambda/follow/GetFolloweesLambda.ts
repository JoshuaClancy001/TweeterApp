import {UserItemRequest, UserItemResponse} from "tweeter-shared"
import {FollowService} from "../../model/service/FollowService";
import {FollowServiceBase} from "./FollowServiceBase";

const followService = new FollowServiceBase()

export const handler = async (request: UserItemRequest): Promise<UserItemResponse> => {
    return await followService.getFollowees(request.token, request.userAlias, request.pageSize, request.lastItem);
}
