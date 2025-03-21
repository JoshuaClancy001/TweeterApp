import {TweeterResponse} from "./TweeterResponse";

export interface FollowUnfollowResponse extends TweeterResponse {
    followerCount: number;
    followeeCount: number;
}