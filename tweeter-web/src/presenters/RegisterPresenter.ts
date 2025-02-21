import {UserService} from "../model/service/UserService";
import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";
import {Buffer} from "buffer";
import {Presenter, View} from "./Presenter";

export interface RegisterView extends View{}

export class RegisterPresenter extends Presenter<RegisterView>{
    private userService: UserService
    private isLoading

    constructor(view: RegisterView) {
        super(view);
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

    public async handleImageFile(
        file: File | undefined,
        setImageUrl: (url: string) => void,
        setImageBytes: (bytes: Uint8Array) => void,
        setImageFileExtension: (extension: string) => void
        ){
        if (file) {
            setImageUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string;

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents =
                    imageStringBase64.split("base64,")[1];

                const bytes: Uint8Array = Buffer.from(
                    imageStringBase64BufferContents,
                    "base64"
                );

                setImageBytes(bytes);
            };
            reader.readAsDataURL(file);

            // Set image file extension (and move to a separate method)
            const fileExtension = this.getFileExtension(file);
            if (fileExtension) {
                setImageFileExtension(fileExtension);
            }
        } else {
            setImageUrl("");
            setImageBytes(new Uint8Array());
        }
    };

    public getFileExtension = (file: File): string | undefined => {
        return file.name.split(".").pop();
    };
}
