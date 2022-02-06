import React, { useState } from 'react';
import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from '../Cart/CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout]= useState(false);
  const [isSubmitting, setIsSubmitting]= useState(false);
  const [didSubmit, setDidsubmit]=useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  // with hasItems, checking no of items, if greater than 0 then only hv order btn

  const orderHandler=(event)=>{
    event.preventDefault();
    setIsCheckout(true);
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };
  const modalActions=(
    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  );

  const submitOrderHandler=async(userData)=>{
    setIsSubmitting(true);
    await fetch('https://react-food-6160e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
      method:'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
    })
  });
  setIsSubmitting(false);
  setDidsubmit(true);
  cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent=(
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const didsubmitModalContent=(
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  const SubmittingModalContent=(
    <p>Sending the order details..</p>
  )

  return (
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModalContent}
     {isSubmitting && !didSubmit && SubmittingModalContent}
     {!isSubmitting && didSubmit && didsubmitModalContent}
    </Modal>
  );
};

export default Cart;