import {AuthResponse, LoginRequest, PostStatusRequest, RegisterRequest, TweeterResponse} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";
import {UserServiceBase} from "./UserServiceBase";

const userBaseService = new UserServiceBase()

export const handler = async (request: RegisterRequest): Promise<AuthResponse> => {
    return await userBaseService.register(request.firstName, request.lastName, request.alias, request.password, request.userImageBytes, request.imageFileExtension)
}