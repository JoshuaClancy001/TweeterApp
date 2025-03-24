import {ServerFacade} from "../src/network/ServerFacade";
import {AuthResponse, AuthToken, GetCountRequest, RegisterRequest, UserItemRequest} from "tweeter-shared";
import "isomorphic-fetch"
import {StatusService} from "../src/model/service/StatusService";


describe("Status Service", () => {
    it('loads more story items', async () => {
        const statusService = new StatusService();
        const authToken = new AuthToken("token", Date.now());
        const statusObject = {
            userAlias: "alias",
            pageSize: 10,
            lastItem: null
        }
        const [statuses, hasMore] = await statusService.loadMoreStoryItems(authToken, statusObject.userAlias, statusObject.pageSize, statusObject.lastItem);
        // Assert
        expect(statuses).toBeDefined();
        expect(hasMore).toBeDefined();
        expect(statuses.length).toBeGreaterThan(0);

    });
});