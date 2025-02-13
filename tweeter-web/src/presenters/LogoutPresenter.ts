import {UserService} from "../model/service/UserService";
import {AuthToken} from "tweeter-shared";

export interface LogoutView{
    displayErrorMessage: (message: string) => void
    displayInfoMessage: (message: string,
                         duration: number,
                         bootstrapClasses?: string
    ) => void,
    clearLastInfoMessage: () => void
    clearUserInfo():void
}

export class LogoutPresenter {
    private userService: UserService;
    private view: LogoutView;

    constructor(view: LogoutView) {
        this.view = view;
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