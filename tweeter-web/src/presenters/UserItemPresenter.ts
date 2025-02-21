import {User} from "tweeter-shared";
import {ItemPresenter, ItemView} from "./ItemPresenter";
import {FollowService} from "../model/service/FollowService";

export interface UserItemView extends ItemView<UserItemView, User>{}

export abstract class UserItemPresenter extends ItemPresenter<UserItemView, User, FollowService> {

    protected createService(): FollowService {
        return new FollowService();
    }

}