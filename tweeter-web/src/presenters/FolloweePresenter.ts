import {FollowService} from "../model/service/FollowService";
import {UserItemPresenter, UserItemView} from "./UserItemPresenter";
import {AuthToken, User} from "tweeter-shared";
import {PAGE_SIZE} from "./ItemPresenter";

export class FolloweePresenter extends UserItemPresenter{

    protected getItemDescription(): string {
        return "load followees";
    }

    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowees(
            authToken!,
            userAlias,
            PAGE_SIZE,
            this.lastItem
        );
    }
}