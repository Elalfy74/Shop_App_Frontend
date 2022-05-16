import { useSelector } from "react-redux";

import classes from "./CartSummary.module.css";

const CartSummary = () => {
  const totalPrice = useSelector((state) => state.cart.data.totalPrice);

  return (
    <div className={classes.summary}>
      <h2>Order summary</h2>
      <p>
        <span>Subtotal</span> $ {totalPrice}
      </p>
      <p>
        <span>Estimated Shipping</span> $ 10
      </p>
      <p>
        <span>Shipping Discount</span> $ 0
      </p>
      <p>
        <span>Total</span> $ 80
      </p>
      <button>checkout now</button>
    </div>
  );
};

export default CartSummary;
