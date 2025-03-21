import {FollowUnfollowRequest, FollowUnfollowResponse} from "tweeter-shared";
import {FollowService} from "../../model/service/FollowService";

export const handler = async (request: FollowUnfollowRequest): Promise<FollowUnfollowResponse> => {
    const followService = new FollowService();
    const [followerCount, followeeCount] = await followService.unfollow(request.token, request.userToFollow);
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    };
}