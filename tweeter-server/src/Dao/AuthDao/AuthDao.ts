import {AuthToken, UserDto} from "tweeter-shared";
import {AuthTokenDto} from "tweeter-shared/dist/model/dto/AuthTokenDto";
import {AuthDynamoDao} from "./AuthDynamoDao";

export interface AuthDao {
    readAuth(authtoken: AuthTokenDto): Promise<AuthTokenDto | undefined>;
    createAuth(authtoken: AuthTokenDto, alias: string): Promise<void>;
    updateAuth(authToken: AuthToken ): Promise<void>;
    deleteAuth(authToken: AuthToken ): Promise<void>;
}