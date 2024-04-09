import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart : () => { }
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];
        const existingItem = state.items[existingCartItemIndex];

        if (existingCartItemIndex > -1) {
            //item already present
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            //new item to be inserted
            updatedItems.push({ ...action.item, quantity: 1 });

        }
        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const updatedItems = [...state.items];
        const existingItem = state.items[existingCartItemIndex];

        if (existingItem.quantity > 1) {
            //element already present with quantity > 1. We need reduce it's quantity by 1
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            //remove the entire item from the shopping cart
            updatedItems.splice(existingCartItemIndex, 1) //it will remove 1 item from that index
        }
        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        return {...state, items : [] };
    }
    return state;
};

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const addItem = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    };

    const removeItem = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    };

    const clearCart = () => {
        dispatchCartAction({ type : 'CLEAR_CART'});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    console.log(cartContext);
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
};

export default CartContext;