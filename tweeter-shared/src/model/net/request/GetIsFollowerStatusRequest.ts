import {UserDto} from "../../dto/UserDto";
import {TweeterRequest} from "./TweeterRequest";


export interface GetIsFollowerStatusRequest extends TweeterRequest {
    user: UserDto
    selectedUser: UserDto
}