import {AuthToken, FakeData, User, UserDto} from "tweeter-shared";
import {Buffer} from "buffer";
import {AuthTokenDto} from "tweeter-shared/dist/model/dto/AuthTokenDto";

export class UserService {

    private generateUserDto = (): UserDto => {
        const user = FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid user");
        }
        return user.dto;
    }

    public async login (alias: string, password: string): Promise<[UserDto, AuthTokenDto]>{
        // TODO: Replace with the result of calling the server
        // const user = FakeData.instance.firstUser;
        //
        // if (user === null) {
        //     throw new Error("Invalid alias or password");
        // }
        let userDto = this.generateUserDto()

        return [userDto, FakeData.instance.authToken.dto];
    };

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[UserDto, AuthTokenDto]>{
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
            Buffer.from(userImageBytes).toString("base64");

        // // TODO: Replace with the result of calling the server
        // const user = FakeData.instance.firstUser;
        //
        // if (user === null) {
        //     throw new Error("Invalid registration");
        // }
        let userDto = this.generateUserDto()

        return [userDto, FakeData.instance.authToken.dto];
    };

    public getUser = async (
        token: string,
        alias: string
    ): Promise<UserDto | null> => {
        let user: User = await FakeData.instance.findUserByAlias(alias);
        return user?.dto || null;
    };

    public async  logout(token: string): Promise<void>{
        // ause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
}