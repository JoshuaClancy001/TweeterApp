import {StatusService} from "../model/service/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";


export interface PostStatusView{
    displayErrorMessage: (message: string) => void
    displayInfoMessage: (message: string,
                         duration: number,
                         bootstrapClasses?: string
    ) => void,
    clearLastInfoMessage: () => void
}

export class PostStatusPresenter {
    private statusService: StatusService
    private view: PostStatusView

    constructor(view: PostStatusView) {
        this.view = view
        this.statusService = new StatusService()
    }

    public async submitPost(
        setIsLoading: (boolean: boolean) => void,
        post: string,
        setPost: (post: string) => void,
        currentUser: User,
        authToken: AuthToken,

    ): Promise<void> {
        try {
            setIsLoading(true);
            this.view.displayInfoMessage("Posting status...", 0);

            const status = new Status(post, currentUser!, Date.now());

            await this.statusService.postStatus(authToken!, status);

            setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
            this.view.displayErrorMessage(
                `Failed to post the status because of exception: ${error}`
            );
        } finally {
            this.view.clearLastInfoMessage();
            setIsLoading(false);
        }
    }


}