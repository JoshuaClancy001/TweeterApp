import {User} from "tweeter-shared";
import {View} from "./Presenter";
import {ItemPresenter, ItemView} from "./ItemPresenter";
import {FollowService} from "../model/service/FollowService";
import UserItem from "../components/userItem/UserItem";

export interface UserItemView extends ItemView<UserItemView, User>{}

export abstract class UserItemPresenter extends ItemPresenter<UserItemView, User, FollowService> {

    protected createService(): FollowService {
        return new FollowService();
    }

}