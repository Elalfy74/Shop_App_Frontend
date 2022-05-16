import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart_reducer";
import { updateItemToBE } from "../../redux/cart_actions";
import { Link } from "react-router-dom";
import {
  Star,
  StarOutlineOutlined,
  LocalMallOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
      dispatch(cartActions.increaseItem(product));
    }
  };
  return (
    <div className={classes.card}>
      <div className={classes.img}>
        <Link to={`/products/${product._id}`}>
          <LazyLoadImage src={product.img} alt="product" effect="blur" />
        </Link>
        <div className={classes.actions}>
          <LocalMallOutlined onClick={() => addToCartHandler(product)} />
          <FavoriteBorderOutlined />
        </div>
      </div>
      {product.brand && (
        <div className={classes.info}>
          <p>{product.brand}</p>
          <Link to={`/products/${product._id}`}>
            <h3>{product.title}</h3>
          </Link>
          <div className={classes.footer}>
            <div className={classes.stars}>
              {stars.map((starNum, index) => (
                <Star className={classes.yellow} key={index} />
              ))}
              {emptystars &&
                emptystars.map((starNum, index) => (
                  <StarOutlineOutlined
                    className={classes.default}
                    key={index}
                  />
                ))}
            </div>
            ${product.price}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
