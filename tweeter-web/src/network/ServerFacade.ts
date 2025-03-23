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
    GetIsFollowerStatusResponse,
    GetCountRequest,
    GetCountResponse,
    FollowUnfollowRequest,
    FollowUnfollowResponse,
    PostStatusRequest,
    TweeterResponse,
    LoginRequest,
    AuthResponse,
    AuthToken,
    RegisterRequest,
    GetUserRequest,
    TweeterRequest, GetUserResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
    private SERVER_URL = "https://hbgm4gtog8.execute-api.us-east-1.amazonaws.com/dev";

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

    public async follow(
        request: FollowUnfollowRequest
    ): Promise<[number, number]> {
        const response = await this.clientCommunicator.doPost<
            FollowUnfollowRequest,
            FollowUnfollowResponse
        >(request, "/followState/follow");

        // Handle errors
        if (response.success) {
            return [response.followerCount, response.followeeCount];
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async unfollow(
        request: FollowUnfollowRequest
    ): Promise<[number, number]> {
        const response = await this.clientCommunicator.doPost<
            FollowUnfollowRequest,
            FollowUnfollowResponse
        >(request, "/followState/unfollow");

        // Handle errors
        if (response.success) {
            return [response.followerCount, response.followeeCount];
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async postStatus(
        request: PostStatusRequest,
    ): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            PostStatusRequest,
            TweeterResponse
        >(request, "/postStatus");

        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async login(
        request: LoginRequest,
    ): Promise<[User, AuthToken]> {
        const response = await this.clientCommunicator.doPost<
            LoginRequest,
            AuthResponse
        >(request, "/authentication/login");

        if (response.success) {
            return [User.fromDto(response.user)!, AuthToken.fromDto(response.authToken)!];
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async register(
        request: RegisterRequest,
    ): Promise<[User, AuthToken]> {
        const response = await this.clientCommunicator.doPost<
            RegisterRequest,
            AuthResponse
        >(request, "/authentication/register");

        if (response.success) {
            return [User.fromDto(response.user)!, AuthToken.fromDto(response.authToken)!];
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async getUser(
        request: GetUserRequest,
    ): Promise<User | null> {
        const response = await this.clientCommunicator.doPost<
            GetUserRequest,
            GetUserResponse
        >(request, "/authentication/getUser");

        if (response.success) {
            let user: User | null = User.fromDto(response.user)!;
            return user
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    public async logout(
        request: TweeterRequest,
    ): Promise<void> {
        const response = await this.clientCommunicator.doPost<
            TweeterRequest,
            TweeterResponse
        >(request, "/authentication/logout");

        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }



}