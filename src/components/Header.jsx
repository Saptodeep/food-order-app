import { useContext } from 'react';
import Button from '../UI/Button';
import logoReact from '../assets/logo.jpg';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    //reduce function 
    //first parameter is a function which takes two arguments -- first argument is the final value , 
    //2nd argument is the item from which you want to derive something
    //2nd parameter is the initial value for the first argument of the function

    const totalCartItems = cartCtx.items.reduce((totalQuantity, item) => {
        return totalQuantity + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return <header id="main-header">
        <div id="title">
            <img src={logoReact} alt="React food restaurant" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick = {handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>


    </header>
}

export default Header;