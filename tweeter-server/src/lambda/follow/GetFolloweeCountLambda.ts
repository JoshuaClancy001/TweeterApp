import {GetCountRequest, GetCountResponse} from "tweeter-shared";
import {FollowService} from "../../model/service/FollowService";
import {FollowServiceBase} from "./FollowServiceBase";

const followService = new FollowServiceBase()

export const handler = async (request: GetCountRequest): Promise<GetCountResponse> => {
    return await followService.getFolloweeCount(request.token, request.user);
}