import {TweeterRequest, TweeterResponse} from "tweeter-shared";
import {UserServiceBase} from "./UserServiceBase";

const userBaseService = new UserServiceBase()

export const handler = async (request: TweeterRequest): Promise<TweeterResponse> => {
    return await userBaseService.logout(request.token)

}