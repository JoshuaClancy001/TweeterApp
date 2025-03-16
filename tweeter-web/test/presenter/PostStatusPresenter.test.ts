import {StatusService} from "../../src/model/service/StatusService";
import {PostStatusPresenter, PostStatusView} from "../../src/presenters/PostStatusPresenter";
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito";
import {AuthToken, Status, User} from "tweeter-shared";


describe("PostStatusPresenter", () => {
    let mockPostStatusView : PostStatusView;
    let postStatusPresenter : PostStatusPresenter;
    let mockStatusService : StatusService;
    const mockCurrentUser = mock(User);
    const currentUser = instance(mockCurrentUser);
    const mockAuthToken = mock(AuthToken);
    const authToken = instance(mockAuthToken);
    const mockStatus = mock(Status);
    const status = instance(mockStatus);

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);
        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);
        when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
    })

    it("tells the view to display a posting status message", async () => {
        const setIsLoading = jest.fn();
        const setPost = jest.fn();
        await postStatusPresenter.submitPost(setIsLoading, "post", setPost,currentUser,authToken );
        verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    });

    it("calls postStatus on the post status service with the correct status string and authToken", async () => {
        await postStatusPresenter.statusService.postStatus(authToken, status);
        verify(mockStatusService.postStatus(authToken, status)).once();
        let [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).last();
        expect(capturedAuthToken).toEqual(authToken);
        expect(capturedStatus).toEqual(status);
    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message.", async () => {
        const setIsLoading = jest.fn();
        const setPost = jest.fn();
        await postStatusPresenter.submitPost(setIsLoading, "post", setPost,currentUser,authToken );
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.clearPost()).once();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
        verify(mockPostStatusView.displayErrorMessage("Failed to post status because of exception: An error occurred")).never();

    });
    it("tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message.", async () => {
        const error = new Error("An error occurred");
        when(mockStatusService.postStatus(authToken, anything())).thenThrow(error);
        const setIsLoading = jest.fn();
        const setPost = jest.fn();
        await postStatusPresenter.submitPost(setIsLoading, "post", setPost, currentUser, authToken);
        verify(mockPostStatusView.displayErrorMessage("Failed to post status because of exception: An error occurred")).once();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.clearPost()).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();
    });

});