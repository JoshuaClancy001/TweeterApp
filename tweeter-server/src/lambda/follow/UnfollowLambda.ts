import {FollowUnfollowRequest, FollowUnfollowResponse} from "tweeter-shared";
import {FollowService} from "../../model/service/FollowService";
import {FollowServiceBase} from "./FollowServiceBase";

const followService = new FollowServiceBase()

export const handler = async (request: FollowUnfollowRequest): Promise<FollowUnfollowResponse> => {
    return await followService.unfollow(request.token, request.userToFollow);
}