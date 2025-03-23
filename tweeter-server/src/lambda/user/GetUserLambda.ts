import {GetUserRequest, GetUserResponse,} from "tweeter-shared";
import {UserService} from "../../model/service/UserService";
import {UserServiceBase} from "./UserServiceBase";

const userBaseService = new UserServiceBase()

export const handler = async (request: GetUserRequest): Promise<GetUserResponse> => {
    return await userBaseService.getUser(request.token, request.alias)
}