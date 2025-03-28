import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";
import {View} from "./Presenter";
import {AuthenticationPresenter} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<View>{

    public async doLogin(isLoading: boolean,alias: string, password: string,navigate: NavigateFunction, originalUrl: string | undefined, rememberMe: boolean, updateUserInfo: (currentUser: User,displayedUser: (User | null), authToken: AuthToken, remember: boolean) => void): Promise<void> {
        await this.doAuthentication(async () => {
            return await this.userService.login(alias, password);
        }, isLoading, () => {
            this.doTheNavigating(navigate, originalUrl);
        }, rememberMe, navigate, updateUserInfo);
    };

    public doTheNavigating(navigate: NavigateFunction, originalUrl: string | undefined): void {
        if (!!originalUrl) {
            navigate(originalUrl);
        } else {
            navigate("/");
        }
    }


}
