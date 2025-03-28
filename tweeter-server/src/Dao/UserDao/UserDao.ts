import { UserDto } from "tweeter-shared";
import {UserDynamoDao} from "./UserDynamoDao";

export interface UserDao {
    read(alias: string, password: string): Promise<[UserDto | undefined, string]>;
    createUser(user: UserDto, password: string): Promise<void>;
    update(UserDto: UserDto): UserDto;
    delete(UserDto: UserDto): UserDto;
}