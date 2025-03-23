import {AuthToken,GetUserRequest, LoginRequest, RegisterRequest, TweeterRequest, User} from "tweeter-shared";
import {Buffer} from "buffer";
import {ServerFacade} from "../../network/ServerFacade";

export class UserService {
    private serverFAcade: ServerFacade = new ServerFacade();

    public async login (alias: string, password: string): Promise<[User, AuthToken]>{
        let request: LoginRequest = {
            alias: alias,
            password: password
        }

        return this.serverFAcade.login(request);
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[User, AuthToken]>{
        let request: RegisterRequest = {
            firstName: firstName,
            lastName: lastName,
            alias: alias,
            password: password,
            userImageBytes: userImageBytes,
            imageFileExtension: imageFileExtension
        }
        return this.serverFAcade.register(request);
    };

    public getUser = async (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> => {
        let request: GetUserRequest = {
            token: authToken.token,
            alias: alias
        }
        return this.serverFAcade.getUser(request);
    };

    public async  logout(authToken: AuthToken): Promise<void>{
        let request: TweeterRequest = {
            token: authToken.token
        }
        await this.serverFAcade.logout(request);
    };
}