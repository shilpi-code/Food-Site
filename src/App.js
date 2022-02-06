import { useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/cart-provider';

function App() {
  const [cartIsShown,setCartShown]= useState(false);

  const showCarthandler= () =>{
    setCartShown(true);
  }
  const hideCartHandler= () =>{
    setCartShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCarthandler}/>
      <Meals/>
  </CartProvider>
  );
}

export default App;
