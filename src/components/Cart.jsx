import CartContext from "../store/CartContext"
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import { useContext } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import CartItem from "./CartItem";

export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    let totalPrice = cartCtx.items.reduce((totalItemsPrice, item) =>
        totalItemsPrice + item.quantity * item.price, 0);

    function handleHideCart(){
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout(){
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}
        onClose={userProgressCtx.progress === 'cart' ? handleHideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => 
                <CartItem 
                key={item.id} 
                name = {item.name}
                qty = {item.quantity}
                price = {item.price}
                onIncrease = {() => cartCtx.addItem(item)}
                onDecrease = {() => cartCtx.removeItem(item.id)}
                />)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick = {handleHideCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick = {handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}