import {AuthResponse, LoginRequest, PostStatusRequest, TweeterResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";
import {UserServiceBase} from "./UserServiceBase";

const userBaseService = new UserServiceBase()

export const handler = async (request: LoginRequest): Promise<AuthResponse> => {
        return await userBaseService.login(request.alias, request.password)
}


