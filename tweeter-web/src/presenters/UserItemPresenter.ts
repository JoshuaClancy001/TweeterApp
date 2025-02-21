import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";

export interface UserItemView extends View{
    addItems: (newItems: User[]) => void
}

export abstract class UserItemPresenter extends Presenter<UserItemView>{
    private _hasMoreItems = true;
    private _lastItem :  User | null = null;


    protected constructor(view: UserItemView) {
        super(view)
    }



    get hasMoreItems():boolean{
        return this._hasMoreItems;
    }
    protected get lastItem(){
        return this._lastItem;
    }

    protected set lastItem(lastItem: User | null){
        this._lastItem = lastItem;
    }

    protected set hasMoreItems(hasMoreItems: boolean){
        this._hasMoreItems = hasMoreItems;
    }

    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string ):void;
}