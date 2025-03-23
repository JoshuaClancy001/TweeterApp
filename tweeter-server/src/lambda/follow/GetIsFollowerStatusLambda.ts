import {FollowService} from "../../model/service/FollowService";
import {GetIsFollowerStatusRequest, GetIsFollowerStatusResponse} from "tweeter-shared";
import {FollowServiceBase} from "./FollowServiceBase";

const followService = new FollowServiceBase()
export const handler = async (request: GetIsFollowerStatusRequest): Promise<GetIsFollowerStatusResponse> => {
    return await followService.getIsFollowerStatus(request.token, request.user, request.selectedUser);
}