import {UserService} from "../model/service/UserService";
import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";

export interface NavigateUserView extends View{
    setDisplayedUser(user: User):void;
}

export class navigateUserPresenter extends Presenter<NavigateUserView>{
    private userService: UserService;

    constructor(view: NavigateUserView) {
        super(view)
        this.userService = new UserService();
    }

    navigateToUser = async (
        event: React.MouseEvent,
        authToken: AuthToken,
        currentUser: User,
        ): Promise<void> => {
        await this.doFailureReportingOperation("get user", async () => {
            const alias = this.extractAlias(event.target.toString());

            const user = await this.userService.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        });
    };

    public extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };


}