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
import {AuthDao} from "./AuthDao";
import {AuthTokenDto} from "tweeter-shared/dist/model/dto/AuthTokenDto";


export class AuthDynamoDao implements AuthDao {

    readonly tableName: string = "Authtokens";
    readonly alias: string = "alias"
    readonly authtoken: string = "authtoken"
    readonly timestamp: string = "timestamp"
    readonly expiration: string = "expiration"

    readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    public async createAuth(authtoken: AuthTokenDto, alias: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                [this.alias]: alias,
                [this.authtoken]: authtoken.token,
                [this.timestamp]: authtoken.timestamp,
                [this.expiration]: authtoken.timestamp + (5 * 60 * 1000)
            },
        }
        await this.client.send(new PutCommand(params));
    }

    public async deleteAuth(authtoken: AuthTokenDto): Promise<void> {
        return undefined
    }

    public async readAuth(authtoken:AuthTokenDto): Promise<AuthTokenDto | undefined> {
        const params = {
            TableName: this.tableName,
            Key: {
                [this.authtoken]: authtoken.token
            },
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item ? {
            token: output.Item[this.authtoken],
            timestamp: output.Item[this.timestamp]
        } : undefined;
    }

    public async updateAuth(authtoken: AuthTokenDto): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: {
                [this.authtoken]: authtoken.token
            },
            UpdateExpression: "SET timestamp = :timestamp",
            ExpressionAttributeValues: {
                ":timestamp": authtoken.timestamp
            },
        };
        await this.client.send(new UpdateCommand(params));
    }



}