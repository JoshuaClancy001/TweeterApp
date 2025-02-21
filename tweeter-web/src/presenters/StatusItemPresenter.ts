import {AuthToken, Status} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {ItemPresenter} from "./ItemPresenter";

export interface StatusItemView extends View {
    addItems: (newItems: Status[]) => void
}

export abstract class StatusItemPresenter extends ItemPresenter<StatusItemView, Status> {

    protected constructor(view: StatusItemView) {
        super(view)
    }


}