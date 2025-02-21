import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {NavigateFunction} from "react-router-dom";
import {UserService} from "../model/service/UserService";

export abstract class AuthenticationPresenter<T extends View> extends Presenter<T>{

    protected _userService: UserService

    constructor(view: T) {
        super(view);
        this._userService = new UserService();
    }

    protected get userService(): UserService {
        return this._userService;
    }

    public async doAuthentication(serviceCall: () => Promise<[User, AuthToken]>, isLoading: boolean, doTheNavigating: () => void, rememberMe: boolean, navigate: NavigateFunction, updateUserInfo: (currentUser: User, displayedUser: (User | null),authToken: AuthToken, rememberMe: boolean) => void): Promise<void> {

        await this.doFailureReportingOperation("log user in", async () => {
            isLoading = true;

            const [user, authToken] = await serviceCall();

            updateUserInfo(user, user, authToken, rememberMe);

            doTheNavigating();
        });
    }

    public abstract doTheNavigating(navigate: NavigateFunction, originalUrl?: string | undefined): void;


}