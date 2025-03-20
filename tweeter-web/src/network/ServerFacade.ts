import {
    UserItemRequest,
    UserItemResponse,
    User,
    UserDto,
    StatusItemRequest,
    Status,
    StatusItemResponse,
    StatusDto,
    GetIsFollowerStatusRequest,
    GetIsFollowerStatusResponse, GetCountRequest, GetCountResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
    private SERVER_URL = "https://6o8ihe0qej.execute-api.us-east-1.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    public async getMoreFollowees(
        request: UserItemRequest
    ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            UserItemRequest,
            UserItemResponse
        >(request, "/followee/list");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
            response.success && response.items
                ? response.items.map((dto: UserDto) => User.fromDto(dto) as User)
                : null;

        // Handle errors
        if (response.success) {
            if (items == null) {
                throw new Error(`No followees found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }


    public async getMoreFollowers(
        request: UserItemRequest
    ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            UserItemRequest,
            UserItemResponse
        >(request, "/follower/list");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
            response.success && response.items
                ? response.items.map((dto: UserDto) => User.fromDto(dto) as User)
                : null;

        // Handle errors
        if (response.success) {
            if (items == null) {
                throw new Error(`No followees found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }


    public async getMoreFeedItems(
        request: StatusItemRequest
    ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            StatusItemRequest,
            StatusItemResponse
        >(request, "/feed/list");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: Status[] | null =
            response.success && response.items
                ? response.items.map((dto: StatusDto) => Status.fromDto(dto) as Status)
                : null;

        // Handle errors
        if (response.success) {
            if (items == null) {
                throw new Error(`No feed found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async getMoreStoryItems(
        request: StatusItemRequest
    ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
            StatusItemRequest,
            StatusItemResponse
        >(request, "/story/list");

        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: Status[] | null =
            response.success && response.items
                ? response.items.map((dto: StatusDto) => Status.fromDto(dto) as Status)
                : null;

        // Handle errors
        if (response.success) {
            if (items == null) {
                throw new Error(`No story found`);
            } else {
                return [items, response.hasMore];
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }


    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        const response = await this.clientCommunicator.doPost<
            GetIsFollowerStatusRequest,
            GetIsFollowerStatusResponse
        >(request, "/follower/getIsFollowerStatus");

        if (response.success) {
            return response.isFollower;
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async getFollowerCount(
        request: GetCountRequest
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            GetCountRequest,
            GetCountResponse
        >(request, "/follower/count");

        // Handle errors
        if (response.success) {
            return response.count;
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async getFolloweeCount(
        request: GetCountRequest
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            GetCountRequest,
            GetCountResponse
        >(request, "/followee/count");

        // Handle errors
        if (response.success) {
            return response.count;
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

}