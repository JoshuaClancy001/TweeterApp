import {Presenter, View} from "./Presenter";
import {AuthToken, Status} from "tweeter-shared";
import {StatusItemView} from "./StatusItemPresenter";

export abstract class ItemPresenter<T extends View, U> extends Presenter<T>{
    private _hasMoreItems = true;
    private _lastItem: U | null = null;

    get hasMoreItems(){
        return this._hasMoreItems;
    }
    protected get lastItem(){
        return this._lastItem;
    }
    protected set lastItem(lastItem){
        this._lastItem = lastItem;
    }
    protected set hasMoreItems(hasMoreItems){
        this._hasMoreItems = hasMoreItems;
    }
    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
}