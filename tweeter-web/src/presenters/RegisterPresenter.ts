import {UserService} from "../model/service/UserService";
import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";

export interface RegisterView{
    displayErrorMessage: (message: string) => void;
}

export class RegisterPresenter {
    private userService: UserService
    private view: RegisterView
    private isLoading

    constructor(view: RegisterView) {
        this.view = view;
        this.userService = new UserService();
        this.isLoading = true;
    }

    public async doRegister(
        isLoading: boolean,
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageBytes: Uint8Array,
        imageFileExtension: string,
        navigate: NavigateFunction,
        rememberMe: boolean,
        updateUserInfo: (
            currentUser: User,
            displayedUser: User | null,
            authToken: AuthToken,
            remember: boolean
        ) => void


                              ){
        try {
            isLoading = true;

            const [user, authToken] = await this.userService.register(
                firstName,
                lastName,
                alias,
                password,
                imageBytes,
                imageFileExtension
            );

            updateUserInfo(user, user, authToken, rememberMe);
            navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to register user because of exception: ${error}`
            );
        } finally {
            isLoading = false;
        }
    };
}
