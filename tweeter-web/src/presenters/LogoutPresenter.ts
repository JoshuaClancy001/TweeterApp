import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";
import {MessageView, Presenter, View} from "./Presenter";

export interface LogoutView extends MessageView{
    clearUserInfo():void
}

export class LogoutPresenter extends Presenter<LogoutView>{
    private userService: UserService;

    constructor(view: LogoutView) {
        super(view)
        this.userService = new UserService();
    }

    public async logOut(authToken: AuthToken): Promise<void> {
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.userService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user out because of exception: ${error}`
            );
        }
    };
}