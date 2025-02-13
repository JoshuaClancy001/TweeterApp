import {AuthToken, Status} from "tweeter-shared";

export interface StatusItemView {
    addItems: (newItems: Status[]) => void
    displayErrorMessage: (message: string) => void
}

export abstract class StatusItemPresenter {
    private _view: StatusItemView
    private _hasMoreItems = true;
    private _lastItem: Status | null = null;

    protected constructor(view: StatusItemView) {
        this._view = view;
    }

    protected get view(){
        return this._view;
    }

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