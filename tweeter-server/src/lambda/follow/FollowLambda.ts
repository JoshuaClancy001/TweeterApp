import {FollowService} from "../../model/service/FollowService";
import {FollowUnfollowRequest, FollowUnfollowResponse} from "tweeter-shared";


export const handler = async (request: FollowUnfollowRequest): Promise<FollowUnfollowResponse> => {
    const followService = new FollowService();
    const [followerCount, followeeCount] = await followService.follow(request.token, request.userToFollow);
    return {
        success: true,
        message: null,
        followerCount: followerCount,
        followeeCount: followeeCount
    };
}