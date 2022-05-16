import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart_reducer";
import { updateItemToBE } from "../../redux/cart_actions";

import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Container from "../../components/UI/Container/Container";
import PaddingContainer from "../../components/UI/PaddingContainer/PaddingContainer";

import axios from "axios";
import classes from "./Productview.module.css";

const ProductView = () => {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({
    status: "pending",
    product: {},
  });

  const { productId } = useParams();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.cart.data);

  const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResult = await axios.get(
          `${BACKEND_DOMAIN}products/${productId}`
        );
        setProduct((prevState) => ({
          ...prevState,
          product: productResult.data,
        }));
      } catch (err) {
        console.log(err);
      }
      setProduct((prevState) => ({ ...prevState, status: "done" }));
    };
    fetchProduct();
  }, [productId, BACKEND_DOMAIN]);

  const increaseHandler = () => {
    if (quantity < 5) {
      setQuantity((prevState) => (prevState += 1));
    }
  };
  const decreaseHandler = () => {
    if (quantity > 0) setQuantity((prevState) => (prevState -= 1));
  };

  const handleAddToCart = (product) => {
    if (quantity === 0) return;
    if (token) {
      dispatch(updateItemToBE(data, { ...product, quantity }, token, "ADD"));
    } else {
      dispatch(cartActions.increaseItem({ ...product, quantity }));
    }
  };

  if (product.status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <PaddingContainer>
        <div className={classes.product_view}>
          <img src={product.product.img} alt="" />
          <div className={classes.description}>
            <h2>{product.product.title}</h2>
            <p>{product.product.desc}</p>
            <h4>$ {product.product.price}</h4>
            <div className={classes.filter}>
              <div className={classes.colors}>
                <span>Color</span>
                {product.product.color.map((color) => (
                  <span
                    key={color}
                    style={{
                      backgroundColor: color,
                    }}
                  ></span>
                ))}
              </div>
              <div className={classes.size}>
                <span>Size</span>
                <select>
                  {product.product.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={classes.quantity}>
              <p>
                <span className={classes.counter} onClick={increaseHandler}>
                  +
                </span>
                {quantity}
                <span className={classes.counter} onClick={decreaseHandler}>
                  -
                </span>
              </p>
              <button onClick={() => handleAddToCart(product.product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </PaddingContainer>
    </Container>
  );
};

export default ProductView;
