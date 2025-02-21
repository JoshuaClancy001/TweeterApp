import {AuthToken, Status} from "tweeter-shared";
import {Presenter, View} from "./Presenter";

export interface StatusItemView extends View {
    addItems: (newItems: Status[]) => void
}

export abstract class StatusItemPresenter extends Presenter<StatusItemView> {
    private _hasMoreItems = true;
    private _lastItem: Status | null = null;

    protected constructor(view: StatusItemView) {
        super(view)
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