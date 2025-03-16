import Login from "../../../../src/components/authentication/login/Login";
import {render,screen, } from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import "@testing-library/jest-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {LoginPresenter} from "../../../../src/presenters/LoginPresenter";
import {anything, capture, instance, mock, verify} from "@typestrong/ts-mockito";
library.add(fab);



describe("Login", () => {
  it("starts with the sign-in button disabled", () => {
    const {signInButton} = renderLoginAndGetElements("");
    expect(signInButton).toBeDisabled();
  });
  it("enables the sign-in button when the alias and password are filled in", async () => {
    const {signInButton, aliasFiled, passwordField} = renderLoginAndGetElements("");
    await userEvent.type(aliasFiled, "alias");
    await userEvent.type(passwordField, "password");
    expect(signInButton).toBeEnabled();
  });
  it("disables the sign-in button when the alias or password is cleared", async () => {
    const {signInButton, aliasFiled, passwordField} = renderLoginAndGetElements("");
    await userEvent.type(aliasFiled, "alias");
    await userEvent.type(passwordField, "password");
    await userEvent.clear(aliasFiled);
    expect(signInButton).toBeDisabled();
    await userEvent.type(aliasFiled, "alias");
    expect(signInButton).toBeEnabled();
    await userEvent.clear(passwordField);
    expect(signInButton).toBeDisabled();
    await userEvent.type(passwordField, "password");
    expect(signInButton).toBeEnabled();
  });
  it("calls the presenters login method with correct parameters when the sign-in button is clicked", async () => {
    const mockPresenter = mock(LoginPresenter);
    const mockPresenterInstance = instance(mockPresenter);
    const originalUrl = "https://someurl.com";
    const Alias = "alias";
    const Password = "password";
    const {signInButton, aliasFiled, passwordField, user} = renderLoginAndGetElements(originalUrl, mockPresenterInstance);
    await userEvent.type(aliasFiled, Alias);
    await userEvent.type(passwordField,Password);
    await user.click(signInButton);
    let [isLoading, alias, password, navigate,calledUrl, rememberMe, updateUserInfo] = capture(mockPresenter.doLogin).last();
    verify(mockPresenter.doLogin(false,Alias,Password,anything(), originalUrl, false, anything())).once();

  });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
    return render(<
        MemoryRouter>
            {!!presenter ? (
                <Login originalUrl={originalUrl} presenter={presenter}/>
            ) : (
                <Login originalUrl={originalUrl}/>
            )}
    </MemoryRouter>
    );
};

const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();
    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole("button", {name: /sign in/i});
    const aliasFiled = screen.getByLabelText("Alias");
    const passwordField = screen.getByLabelText("Password");

    return {signInButton, aliasFiled, passwordField, user};
}