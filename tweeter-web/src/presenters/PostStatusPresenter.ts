import {StatusService} from "../model/service/StatusService";
import {AuthToken, Status, User} from "tweeter-shared";
import {MessageView, Presenter} from "./Presenter";


export interface PostStatusView extends MessageView{}

export class PostStatusPresenter extends Presenter<PostStatusView>{
    private statusService: StatusService

    constructor(view: PostStatusView) {
        super(view)
        this.statusService = new StatusService()
    }

    public async submitPost(
        setIsLoading: (boolean: boolean) => void,
        post: string,
        setPost: (post: string) => void,
        currentUser: User,
        authToken: AuthToken,

    ): Promise<void> {
        await this.doFailureReportingOperation("post status", async () => {
            setIsLoading(true);
            this.view.displayInfoMessage("Posting status...", 0);

            const status = new Status(post, currentUser!, Date.now());

            await this.statusService.postStatus(authToken!, status);

            setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        });
        this.view.clearLastInfoMessage();
        setIsLoading(false);

    }


}