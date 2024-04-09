import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {

    const cartCtx = useContext(CartContext);

    const handleAddItemToCart = () => {
        cartCtx.addItem(meal);
    };

   
    return <>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.id}></img>
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddItemToCart}>Add To Cart</Button>
            </p>

        </article>

    </>
};