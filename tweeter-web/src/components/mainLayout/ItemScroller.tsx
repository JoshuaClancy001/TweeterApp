import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import useInfo from "../userInfo/UserInfoHook";
import { ItemPresenter, ItemView } from "../../presenters/ItemPresenter";

interface Props<U,T> {
    presenterGenerator: (view: ItemView<U>) => ItemPresenter<U, T>;
    itemComponentGenerator: (item: U) => JSX.Element;
}

const ItemScroller = <U, T>(props: Props<U, T>) => {
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<U[]>([]);
    const [newItems, setNewItems] = useState<U[]>([]);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

    const { displayedUser, authToken } = useInfo();

    useEffect(() => {
        reset();
    }, [displayedUser]);

    useEffect(() => {
        if (changedDisplayedUser) {
            loadMoreItems();
        }
    }, [changedDisplayedUser]);

    useEffect(() => {
        if (newItems) {
            setItems([...items, ...newItems]);
        }
    }, [newItems]);

    const reset = async () => {
        setItems([]);
        setNewItems([]);
        setChangedDisplayedUser(true);
        presenter.reset();
    };

    const listener: ItemView<U> = {
        addItems: (newItems: U[]) => setNewItems(newItems),
        displayErrorMessage: displayErrorMessage,
    } as ItemView<U>;

    const [presenter] = useState(props.presenterGenerator(listener));

    const loadMoreItems = async () => {
        presenter.loadMoreItems(authToken!, displayedUser!.alias);
        setChangedDisplayedUser(false);
    };

    return (
        <div className="container px-0 overflow-visible vh-100">
            <InfiniteScroll
                className="pr-0 mr-0"
                dataLength={items.length}
                next={loadMoreItems}
                hasMore={presenter.hasMoreItems}
                loader={<h4>Loading...</h4>}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="row mb-3 mx-0 px-0 border rounded bg-white"
                    >
                        {props.itemComponentGenerator(item)}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ItemScroller;