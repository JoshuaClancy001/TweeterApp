
import { UserItemPresenter} from "./UserItemPresenter";
import {AuthToken, User} from "tweeter-shared";
import {PAGE_SIZE} from "./ItemPresenter";

export class FollowerPresenter extends UserItemPresenter{

    protected getItemDescription(): string {
        return "load followers";
    }

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowers(
            authToken!,
            userAlias,
            PAGE_SIZE,
            this.lastItem
        );
    }
}