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

    private async sendRequest<Req, Res extends TweeterResponse, T>(
        request: Req,
        endpoint: string,
        transform: (response: Res) => T
    ): Promise<T> {
        const response = await this.clientCommunicator.doPost<Req , Res>(request, endpoint);

        if (response.success) {
            return transform(response);
        } else {
            console.error(response);
            throw new Error(response.message ?? "An unknown error occurred");
        }
    }

    private async getMoreItems<T, Req, Res extends UserItemResponse | StatusItemResponse>(
        request: Req,
        endpoint: string,
        fromDto: (dto: any) => T
    ): Promise<[T[], boolean]> {
        return this.sendRequest<Req, Res, [T[], boolean]>(
            request,
            endpoint,
            (response) => [
                response.items
                    ? response.items.map(fromDto).filter((item): item is T => item !== null)
                    : [],
                response.hasMore,
            ]
        );
    }

    public async getMoreFollowees(request: UserItemRequest): Promise<[User[], boolean]> {
        return this.getMoreItems<User, UserItemRequest, UserItemResponse>(
            request,
            "/followee/list",
            (dto) => User.fromDto(dto) as User
        );
    }


    public async getMoreFollowers(
        request: UserItemRequest
    ): Promise<[User[], boolean]> {
        return this.getMoreItems<User, UserItemRequest, UserItemResponse>(
            request,
            "/follower/list",
            (dto) => User.fromDto(dto) as User
        );
    }


    public async getMoreFeedItems(
        request: StatusItemRequest
    ): Promise<[Status[], boolean]> {
        return this.getMoreItems<Status, StatusItemRequest, StatusItemResponse>(
            request,
            "/feed/list",
            (dto) => Status.fromDto(dto) as Status
        );
    }

    public async getMoreStoryItems(
        request: StatusItemRequest
    ): Promise<[Status[], boolean]> {
        return this.getMoreItems<Status, StatusItemRequest, StatusItemResponse>(
            request,
            "/story/list",
            (dto) => Status.fromDto(dto) as Status
        );
    }


    public async getIsFollowerStatus(
        request: GetIsFollowerStatusRequest
    ): Promise<boolean> {
        return this.sendRequest<GetIsFollowerStatusRequest, GetIsFollowerStatusResponse, boolean>(
            request,
            "/follower/getIsFollowerStatus",
            (response) => response.isFollower
        );
    }

    public async getFollowerCount(
        request: GetCountRequest
    ): Promise<number> {
        return this.sendRequest<GetCountRequest, GetCountResponse, number>(
            request,
            "/follower/count",
            (response) => response.count
        );
    }

    public async getFolloweeCount(
        request: GetCountRequest
    ): Promise<number> {
        return this.sendRequest<GetCountRequest, GetCountResponse, number>(
            request,
            "/followee/count",
            (response) => response.count
        );
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
        return this.sendRequest<PostStatusRequest, TweeterResponse, void>(
            request,
            "/postStatus",
            () => undefined
        );
    }

    public async login(
        request: LoginRequest,
    ): Promise<[User, AuthToken]> {
        return this.sendRequest<LoginRequest, AuthResponse, [User, AuthToken]>(
            request,
            "/authentication/login",
            (response) => [User.fromDto(response.user)!, AuthToken.fromDto(response.authToken
            )!]
        );
    }

    public async register(
        request: RegisterRequest,
    ): Promise<[User, AuthToken]> {
        return await this.sendRequest<RegisterRequest, AuthResponse, [User, AuthToken]>(
            request,
            "/authentication/register",
            (response) => [User.fromDto(response.user)!, AuthToken.fromDto(response.authToken
            )!]
        );
    }

    public async getUser(
        request: GetUserRequest,
    ): Promise<User | null> {
        return this.sendRequest<GetUserRequest, GetUserResponse, User | null>(
            request,
            "/authentication/getUser",
            (response) => response.user ? User.fromDto(response.user) : null
        );
    }

    public async logout(
        request: TweeterRequest,
    ): Promise<void> {
        return this.sendRequest<TweeterRequest, TweeterResponse, void>(
            request,
            "/authentication/logout",
            () => undefined
        );
    }



}