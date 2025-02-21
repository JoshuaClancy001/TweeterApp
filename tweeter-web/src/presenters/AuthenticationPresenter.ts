import {AuthToken, User} from "tweeter-shared";
import {Presenter, View} from "./Presenter";
import {NavigateFunction} from "react-router-dom";

export abstract class AuthenticationPresenter<T extends View> extends Presenter<T>{

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