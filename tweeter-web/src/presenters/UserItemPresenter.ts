import {AuthToken, User} from "tweeter-shared";

export interface UserItemView {
    addItems: (newItems: User[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class UserItemPresenter {
    private _hasMoreItems = true;
    private _lastItem :  User | null = null;

    private _view: UserItemView

    protected constructor(view: UserItemView) {
        this._view = view;
    }

    protected get view(){
        return this._view;
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