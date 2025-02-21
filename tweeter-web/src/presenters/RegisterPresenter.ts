import {NavigateFunction} from "react-router-dom";
import {AuthToken, User} from "tweeter-shared";
import {Buffer} from "buffer";
import {View} from "./Presenter";
import {AuthenticationPresenter} from "./AuthenticationPresenter";

export class RegisterPresenter extends AuthenticationPresenter<View>{

    public async doRegister(isLoading: boolean, firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, imageFileExtension: string, navigate: NavigateFunction, rememberMe: boolean, updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void){
        await this.doAuthentication(async () => {
            return await this.userService.register(firstName, lastName, alias, password, imageBytes, imageFileExtension);
        }, isLoading, () => {
            this.doTheNavigating(navigate);
        }, rememberMe, navigate, updateUserInfo);
        isLoading = false;
    }

    public doTheNavigating(navigate: NavigateFunction): void {
            navigate("/");
    }



    public async handleImageFile(file: File | undefined, setImageUrl: (url: string) => void, setImageBytes: (bytes: Uint8Array) => void, setImageFileExtension: (extension: string) => void){
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
