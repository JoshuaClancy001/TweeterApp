import {Presenter, View} from "./Presenter";
import {AuthToken} from "tweeter-shared";


export const PAGE_SIZE = 10;

export interface ItemView<T, U> extends View{
    addItems: (newItems: U[]) => void
}

export abstract class ItemPresenter<T extends ItemView<T,U>, U, V> extends Presenter<T>{
    protected _service: V;
    private _hasMoreItems = true;
    private _lastItem: U | null = null;


    public constructor(view: T) {
        super(view)
        this._service = this.createService();
    }

    protected abstract createService(): V;

    protected get service(){
        return this._service;
    }

    protected get view():T{
        return super.view
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

    public async loadMoreItems(authToken: AuthToken, userAlias: string ){
        await this.doFailureReportingOperation(this.getItemDescription(), async () => {
            const [newItems, hasMore] = await this.getMoreItems(
                authToken!,
                userAlias,
            );

            this.hasMoreItems = hasMore;
            this.lastItem = newItems[newItems.length - 1];
            this.view.addItems(newItems);
        });
    };

    protected abstract getItemDescription(): string;

    protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[U[], boolean]>


}