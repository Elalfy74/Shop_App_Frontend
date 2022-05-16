import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/cart_reducer";
import { updateItemToBE } from "../../../redux/cart_actions";

import {
  Star,
  StarOutlineOutlined,
  LocalMallOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import classes from "./Product.module.css";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.data);
  const token = useSelector((state) => state.auth.token);

  const stars = new Array(product.stars).fill(1);
  const emptystars = new Array(5 - stars.length).fill(1);

  const addToCartHandler = (product) => {
    if (token) {
      dispatch(updateItemToBE(data, { ...product, quantity: 1 }, token, "ADD"));
    } else {
      dispatch(cartActions.increaseItem({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.img}>
        <Link to={`/product/${product._id}`}>
          <img src={product.img} alt="" />
        </Link>
        <div className={classes.actions}>
          <LocalMallOutlined onClick={() => addToCartHandler(product)} />
          <FavoriteBorderOutlined />
        </div>
      </div>
      <div className={classes.info}>
        <p>{product.brand}</p>
        <Link to={`/product/${product._id}`}>
          <h3>{product.title}</h3>
        </Link>
        <div className={classes.footer}>
          <div className={classes.stars}>
            {stars.map((starNum, index) => (
              <Star className={classes.yellow} key={index} />
            ))}
            {emptystars &&
              emptystars.map((starNum, index) => (
                <StarOutlineOutlined className={classes.default} key={index} />
              ))}
          </div>
          ${product.price}
        </div>
      </div>
    </div>
  );
};

export default Product;
