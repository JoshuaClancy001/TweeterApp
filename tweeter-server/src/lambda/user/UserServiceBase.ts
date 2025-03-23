import {UserService} from "../../model/service/UserService";
import {UserDto} from "tweeter-shared";
import {AuthTokenDto} from "tweeter-shared/dist/model/dto/AuthTokenDto";

export class UserServiceBase{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    private async authenticate(action: Promise<[UserDto, AuthTokenDto]>) {
        const [user, token] = await action;
        return {success: true, message: null, user: user, authToken: token}
    }

    async login(alias: string, password: string){
        return await this.authenticate(this.userService.login(alias, password));
    }
    async register(firstName: string, lastName: string, alias: string, password: string, userImageBytes: Uint8Array, imageFileExtension: string){
        return await this.authenticate(this.userService.register(firstName, lastName, alias, password, userImageBytes, imageFileExtension));
    }
    async getUser(token: string, alias: string){
        const user = await this.userService.getUser(token, alias);
        return {success: true, message: null, user: user}
    }
    async logout(token: string){
        await this.userService.logout(token);
        return {success: true, message: null}
    }
}