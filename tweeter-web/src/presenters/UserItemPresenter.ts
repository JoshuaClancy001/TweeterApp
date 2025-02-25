import {User} from "tweeter-shared";
import {ItemPresenter, ItemView} from "./ItemPresenter";
import {FollowService} from "../model/service/FollowService";

export abstract class UserItemPresenter extends ItemPresenter<User, FollowService> {

    protected createService(): FollowService {
        return new FollowService();
    }

}