import { useSelector } from "react-redux";

import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import classes from "./Cart.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data.items);

  return (
    <>
      <CartHeader />
      {cartItems && cartItems.length !== 0 ? (
        <div className={classes.cart_info}>
          <div className={classes.items}>
            {cartItems.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "2rem 0",
          }}
        >
          <h1>Your Cart is Empty</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
