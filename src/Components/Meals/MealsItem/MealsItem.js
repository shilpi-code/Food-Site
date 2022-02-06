import MealForm from './MealForm';
import classes from './MealsItem.module.css';
import CartContext from '../../../store/cart-context';
import { useContext } from 'react';

const MealsItem=(props)=>{
    const price = `$${props.price.toFixed(2)}`;
    const cartCtx= useContext(CartContext);

    const addtoCartHandler=(amount) =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

    return(
        <li className={classes.meals}>
           <div>
           <h3>{props.name}</h3>
            <div className={classes.description}></div>
            <div>{props.description}</div>
            <div className={classes.price}>{price}</div>
           </div>
           <MealForm onAddToCart={addtoCartHandler} id={props.id}/>
        </li>
    );
};

export default MealsItem;