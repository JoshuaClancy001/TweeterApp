import {ServerFacade} from "../src/network/ServerFacade";
import {AuthResponse, GetCountRequest, RegisterRequest, UserItemRequest} from "tweeter-shared";
import "isomorphic-fetch"
import { Buffer } from "buffer";


describe("Server Facade", () => {
    it('registers a user', async () => {


        const serverFacade = new ServerFacade();
        const request: RegisterRequest = {
            firstName: "firstName",
            lastName: "lastName",
            alias: "alias",
            password: "password",
            userImageBytes: Buffer.from("userImageBytes"),
            imageFileExtension: "imageFileExtension"
        }
        const [userResult,authResult] = await serverFacade.register(request);
        // Assert
        expect(userResult).toBeDefined();
        expect(authResult).toBeDefined();

    });

    it('gets followers', async () => {
        const serverFacade = new ServerFacade();
        const request: UserItemRequest = {
            token: "token",
            userAlias: "alias",
            pageSize: 10,
            lastItem: null,
        }
        const [users, hasMore] = await serverFacade.getMoreFollowers(request);

        // Assert
        expect(users).toBeDefined();
        expect(hasMore).toBeDefined();
        expect(users.length).toBeGreaterThan(0);

    });

    it('gets follower count', async () => {
        const serverFacade = new ServerFacade();
        const request: GetCountRequest = {
            token: "token",
            user: {
                firstName: "firstName",
                lastName: "lastName",
                alias: "alias",
                imageUrl: "imageUrl"
            }
        }
        const count = await serverFacade.getFollowerCount(request);

        // Assert
        expect(count).toBeDefined();
        expect(count).toBeGreaterThanOrEqual(0);
    });
});