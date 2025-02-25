import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";

export interface AppNavbarView extends MessageView{
    clearUserInfo():void
    navigateToLoginPage():void
}

export class AppNavbarPresenter extends Presenter<AppNavbarView>{
    private _userService: UserService | null = null;

    constructor(view: AppNavbarView) {
        super(view);
    }

    public get userService(){
        if(this._userService === null){
            this._userService = new UserService();
        }
        return this._userService
    }

    public async logOut(authToken: AuthToken): Promise<void> {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation("log user out", async () => {
            await this.userService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            this.view.navigateToLoginPage();
        });
    };
}