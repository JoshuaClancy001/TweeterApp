import {AppNavbarPresenter,AppNavbarView} from "../../src/presenters/AppNavbarPresenter";
import {anything, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import {AuthToken} from "tweeter-shared";
import {UserService} from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {
    let mockAppNavbarView : AppNavbarView;
    let appNavbarPresenter : AppNavbarPresenter;
    let mockAuthToken = mock(AuthToken);
    const authToken = instance(mockAuthToken);
    let mockUserService : UserService;


    beforeEach(() => {
        mockAppNavbarView = mock<AppNavbarView>();
        const mockAppNavbarViewInstance = instance(mockAppNavbarView);
        const logoutPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance));
        appNavbarPresenter = instance(logoutPresenterSpy);
        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);
        when(logoutPresenterSpy.userService).thenReturn(mockUserServiceInstance);

    });
    it("tells the view to display a logging out message", async () => {
        await appNavbarPresenter.logOut(authToken)
        verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it("calls logout on the userService with correct authToken", async () => {
        await appNavbarPresenter.logOut(authToken)
        verify(mockUserService.logout(authToken)).once();

    });
    it("tells the view to clear the last info mesage, clear the user info, and navigate to the login page", async () => {
        await appNavbarPresenter.logOut(authToken)
        verify(mockAppNavbarView.clearLastInfoMessage()).once();
        verify(mockAppNavbarView.clearUserInfo()).once();
        verify(mockAppNavbarView.navigateToLoginPage()).once();

        verify(mockAppNavbarView.displayErrorMessage(anything())).never();
    });
    it("displays an error message and does not clear the last info message, clear the user info, and navigate to the login page when logout fails", async () => {
        const error = new Error("An error occurred")
        when(mockUserService.logout(authToken)).thenThrow(error);
        await appNavbarPresenter.logOut(authToken)
        verify(mockAppNavbarView.displayErrorMessage("Failed to log user out because of exception: An error occurred")).once();
        verify(mockAppNavbarView.clearLastInfoMessage()).never();
        verify(mockAppNavbarView.clearUserInfo()).never();
        verify(mockAppNavbarView.navigateToLoginPage()).never();
    });
});