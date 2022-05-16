import { Fragment } from "react";

import Button from "../UI/Button/Button";
import classes from "./CartHeader.module.css";

const CartHeader = () => {
  return (
    <Fragment>
      <h1 className={classes.h1}>Your Cart</h1>
      <div className={classes.actions}>
        <Button
          path="/"
          value="continue shopping"
          className={`${classes.btn} ${classes.btn_continue}`}
        />
        <div>
          <a href="#rq" className={classes.link}>
            Shopping Bad <span>(2)</span>
          </a>
          <a href="#rq" className={classes.link}>
            Your Wishlist <span>(2)</span>
          </a>
        </div>
        <Button
          path="/"
          value="checkout know"
          className={`${classes.btn} ${classes.btn_checkout}`}
        />
      </div>
    </Fragment>
  );
};

export default CartHeader;
