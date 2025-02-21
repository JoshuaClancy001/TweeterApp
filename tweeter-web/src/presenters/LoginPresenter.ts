import {UserService} from "../model/service/UserService";
import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";

export interface LoginView extends View{}
export class LoginPresenter extends Presenter<LoginView>{
    private userService: UserService

    constructor(view: LoginView) {
        super(view)
        this.userService = new UserService()
    }

    public async doLogin(isLoading: boolean,alias: string, password: string,navigate: NavigateFunction, originalUrl: string | undefined,
                         rememberMe: boolean,
                         updateUserInfo: (
                             currentUser: User,
                             displayedUser: User | null,
                             authToken: AuthToken,
                             remember: boolean
                         ) => void
    ): Promise<void> {
        try {
            isLoading = true;

            const [user, authToken] = await this.userService.login(alias, password);

            updateUserInfo(user, user, authToken, rememberMe);

            if (!!originalUrl) {
                navigate(originalUrl);
            } else {
                navigate("/");
            }
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to log user in because of exception: ${error}`
            );
        } finally {
            isLoading = false;
        }
    };
}
