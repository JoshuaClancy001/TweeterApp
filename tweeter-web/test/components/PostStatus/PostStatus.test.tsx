
import {render, screen, waitFor,} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import {anything, capture, instance, mock, verify} from "@typestrong/ts-mockito";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import {PostStatusPresenter} from "../../../src/presenters/PostStatusPresenter";
import useInfo from "../../../src/components/userInfo/UserInfoHook";
import {AuthToken, User} from "tweeter-shared";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));

const mockUser = mock(User);
const mockUserInstance = instance(mockUser);
const mockAuthToken = mock(AuthToken);
const mockAuthTokenInstance = instance(mockAuthToken);

    describe("PostStatus", () => {
    beforeAll(() => {
            (useInfo as jest.Mock).mockReturnValue({
                currentUser: mockUserInstance,
                authToken: mockAuthTokenInstance,
            });
        }
    )
    it("starts with the post status and clear buttons disabled", () => {
        const {postButton, clearButton} = renderPostStatusAndGetElements();
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });
    it("enables the post status button and clear button when the post status field is filled in", async () => {
        const {postButton, clearButton, postField} = renderPostStatusAndGetElements();
        await userEvent.type(postField, "post");
        expect(clearButton).toBeEnabled();
        expect(postButton).toBeEnabled();

    });
    it("disables the post status button and clear button when the post status field is cleared", async () => {
        const {postButton, clearButton, postField} = renderPostStatusAndGetElements();
        await userEvent.type(postField, "post");
        expect(postButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
        await userEvent.clear(postField);
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    });
    it("calls the presenters postStatus method with correct parameters when the post status button is clicked", async () => {
        const mockPresenter = mock(PostStatusPresenter);
        const mockPresenterInstance = instance(mockPresenter);
        const Post = "post";
        const {postButton,postField} = renderPostStatusAndGetElements(mockPresenterInstance);
        await userEvent.type(postField, Post);
        await userEvent.click(postButton);
        verify(mockPresenter.submitPost(anything(),Post,anything(),mockUserInstance,mockAuthTokenInstance)).once();
    })
});



const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(<
        MemoryRouter>
            {!!presenter ? (
                <PostStatus presenter={presenter}/>
            ) : (
                <PostStatus/>
            )}
    </MemoryRouter>
    );
};

const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();
    renderPostStatus(presenter);

    const postButton = screen.getByLabelText("Post Status");
    const clearButton = screen.getByLabelText("Clear");
    const postField = screen.getByLabelText("Post Field");

    return {postButton, clearButton, postField, user};
}