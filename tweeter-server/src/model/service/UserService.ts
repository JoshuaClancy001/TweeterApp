import {AuthToken, FakeData, User, UserDto, AuthTokenDto} from "tweeter-shared";
import {Buffer} from "buffer";
import {UserDynamoDao} from "../../Dao/UserDao/UserDynamoDao";
import {UserDao} from "../../Dao/UserDao/UserDao";
import {AuthDao} from "../../Dao/AuthDao/AuthDao";
import {AuthDynamoDao} from "../../Dao/AuthDao/AuthDynamoDao";
import {randomBytes} from "crypto";
import bcrypt from 'bcryptjs';

export class UserService {
    private UserDao: UserDao = new UserDynamoDao();
    private AuthDao: AuthDao = new AuthDynamoDao();

    private generateUserDto = (): UserDto => {
        const user = FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid user");
        }
        return user.dto;
    }

    public async login (alias: string, password: string): Promise<[UserDto, AuthTokenDto]>{

        let [userDto, hashedPassword] = await this.UserDao.read(alias, password)

        if (!bcrypt.compareSync(password, hashedPassword) || !userDto) {
            throw new Error("[Bad Request] Invalid Username or Password1");
        }

        let authString = randomBytes(16).toString('hex')
        let authTokenDto: AuthTokenDto = {token: authString, timestamp: Date.now()}
        await this.AuthDao.createAuth(authTokenDto, alias)

        return [userDto, authTokenDto];
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

        let userDto = {
            firstName: firstName,
            lastName: lastName,
            alias: alias,
            imageUrl: imageStringBase64
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        await this.UserDao.createUser(userDto, hashedPassword)

        let authString = randomBytes(16).toString('hex')
        let authTokenDto: AuthTokenDto = {token: authString, timestamp: Date.now()}
        await this.AuthDao.createAuth(authTokenDto, alias)

        return [userDto, authTokenDto];
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