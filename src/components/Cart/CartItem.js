import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart_reducer";
import { updateItemToBE } from "../../redux/cart_actions";

import classes from "./CartItem.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.cart.data);

  const increaseHandler = (item) => {
    if (token) {
      dispatch(updateItemToBE(data, { ...item, quantity: 1 }, token, "ADD"));
    } else {
      dispatch(cartActions.increaseItem({ ...item, quantity: 1 }));
    }
  };

  const decreaseHandler = (item) => {
    if (token) {
      dispatch(updateItemToBE(data, item, token, "REMOVE"));
    } else {
      dispatch(cartActions.decreaseItem(item));
    }
  };

  return (
    <div className={classes.item}>
      <Link to={`/product/${item._id}`}>
        <img src={item.img} alt="" />
      </Link>
      <div className={classes.info}>
        <p>
          <span>Product: </span>
          {item.title}
        </p>
        <p>
          <span>ID: </span>
          {item._id}
        </p>
        <p className={classes.color}></p>
        <p>
          <span>Size: </span>37.5
        </p>
      </div>
      <div className={classes.quantity}>
        <p>
          <span
            className={classes.counter}
            onClick={() => increaseHandler(item)}
          >
            +
          </span>
          {item.quantity}
          <span
            className={classes.counter}
            onClick={() => decreaseHandler(item)}
          >
            -
          </span>
        </p>
        <p>
          $ <span>{item.price}</span>
        </p>
      </div>
    </div>
  );
};

export default CartItem;
