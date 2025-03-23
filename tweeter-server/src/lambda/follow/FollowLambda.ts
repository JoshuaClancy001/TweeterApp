import {FollowService} from "../../model/service/FollowService";
import {FollowUnfollowRequest, FollowUnfollowResponse} from "tweeter-shared";
import {FollowServiceBase} from "./FollowServiceBase";

const followService = new FollowServiceBase();

export const handler = async (request: FollowUnfollowRequest): Promise<FollowUnfollowResponse> => {
    return await followService.follow(request.token, request.userToFollow);
}