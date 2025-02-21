import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {ItemPresenter} from "./ItemPresenter";

export interface UserItemView extends View{
    addItems: (newItems: User[]) => void
}

export abstract class UserItemPresenter extends ItemPresenter<UserItemView, User> {



    protected constructor(view: UserItemView) {
        super(view)
    }

}