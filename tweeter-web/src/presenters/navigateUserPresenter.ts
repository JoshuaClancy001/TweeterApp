import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";

export interface NavigateUserView{
    displayErrorMessage(message: string): void;
    setDisplayedUser(user: User):void;
}

export class navigateUserPresenter {
    private userService: UserService;
    private view: NavigateUserView;

    constructor(view: NavigateUserView) {
        this.view = view;
        this.userService = new UserService();
    }

    navigateToUser = async (
        event: React.MouseEvent,
        authToken: AuthToken,
        currentUser: User,
        ): Promise<void> => {
        try {
            const alias = this.extractAlias(event.target.toString());

            const user = await this.userService.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        } catch (error) {
            this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };

    public extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };


}