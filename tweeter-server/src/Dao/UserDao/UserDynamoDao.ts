import {UserDao} from "./UserDao";
import {UserDto} from "tweeter-shared";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


export class UserDynamoDao implements UserDao {

    readonly tableName: string = "Users";
    readonly alias: string = "alias"
    readonly password: string = "password"
    readonly firstName: string = "first_name"
    readonly lastName: string = "last_name"
    readonly imageUrl: string = "image_url"

    readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    public async createUser(user: UserDto, password: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.alias]: user.alias,
                [this.password]: password,
                [this.firstName]: user.firstName,
                [this.lastName]: user.lastName,
                [this.imageUrl]: user.imageUrl
            },
        };
        await this.client.send(new PutCommand(params));
    }

    delete(UserDto: UserDto): UserDto {
        return undefined;
    }

    public async read(alias: string, password: string): Promise<[UserDto | undefined, string]>  {
        const params = {
            TableName: this.tableName,
            Key: {
                [this.alias]: alias
            },
        };
        const response = await this.client.send(new GetCommand(params));
        const user = response.Item;
        if (user === undefined) {
            return [undefined, ""];
        }
        return [{
            alias: user[this.alias],
            firstName: user[this.firstName],
            lastName: user[this.lastName],
            imageUrl: user[this.imageUrl]
        }, user[this.password]];
    }

    update(UserDto: UserDto): UserDto {
        return undefined;
    }

}