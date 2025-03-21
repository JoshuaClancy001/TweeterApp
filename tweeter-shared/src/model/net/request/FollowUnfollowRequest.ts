import {TweeterRequest} from "./TweeterRequest";
import {UserDto} from "../../dto/UserDto";

export interface FollowUnfollowRequest extends TweeterRequest {
    userToFollow: UserDto

}