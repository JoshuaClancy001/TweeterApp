import {AuthToken, Status} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {ItemPresenter, ItemView} from "./ItemPresenter";
import {StatusService} from "../model/service/StatusService";

export interface StatusItemView extends ItemView<StatusItemView, Status> {}

export abstract class StatusItemPresenter extends ItemPresenter<StatusItemView, Status, StatusService> {

    protected createService(): StatusService {
        return new StatusService();
    }


}