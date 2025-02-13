import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "./UserInfoHook";
import {useState} from "react";
import {navigateUserPresenter} from "../../presenters/navigateUserPresenter";

const useNavigationHook = () => {
    const { setDisplayedUser, currentUser, authToken } = useInfo();
    const { displayErrorMessage } = useToastListener();

    const listener = {
        displayErrorMessage: displayErrorMessage,
        setDisplayedUser: setDisplayedUser
    }

    const [presenter] = useState(new navigateUserPresenter(listener))

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        await presenter.navigateToUser(event, authToken!, currentUser!)
    };



    return {
        navigateToUser
    }
};
export default useNavigationHook;