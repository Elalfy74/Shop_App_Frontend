import { cartActions } from "./cart_reducer";
import { getCartData, updateCart } from "../lib/api.js";

export const getCart = (token) => {
  return async (dispatch) => {
    dispatch(cartActions.setStatus("pending"));

    try {
      const result = await getCartData(token);
      dispatch(
        cartActions.replaceCart({
          items: result.products,
          totalQuantity: result.totalQuantity,
          totalPrice: result.totalPrice,
        })
      );
      dispatch(cartActions.setStatus("success"));
    } catch (err) {
      dispatch(cartActions.setStatus("error"));
    }
  };
};

export const updateItemToBE = (data, product, token, type) => {
  return async (dispatch) => {
    dispatch(cartActions.setStatus("pending"));

    const itemIndex = data.items.findIndex((item) => item._id === product._id);
    const item = data.items[itemIndex];

    let newData;

    if (type === "ADD") {
      newData = makeNewData(itemIndex, data, item, product, type);
    } else {
      newData = makeNewData(itemIndex, data, item, product, type);
    }
    try {
      await updateCart(token, newData);
      dispatch(getCart(token));
    } catch (err) {
      dispatch(cartActions.setStatus("error"));
    }
  };
};

const makeNewData = (itemIndex, data, item, product, type) => {
  let newData;
  let newProducts;
  let newQuantity = data.totalQuantity;
  let newPrice = data.totalPrice;

  if (type === "ADD") {
    if (item) {
      const newItem = { ...item, quantity: item.quantity + product.quantity };
      newProducts = [...data.items];
      newProducts[itemIndex] = newItem;
    } else {
      newProducts = [...data.items, product];
    }

    newData = {
      items: newProducts,
      totalQuantity: (newQuantity += product.quantity),
      totalPrice: (newPrice += product.price * product.quantity),
    };
  } else {
    if (item.quantity !== 1) {
      const newItem = { ...item, quantity: item.quantity - 1 };
      newProducts = [...data.items];
      newProducts[itemIndex] = newItem;
    } else {
      newProducts = data.items.filter((item) => item._id !== product._id);
    }

    newData = {
      items: newProducts,
      totalQuantity: (newQuantity -= 1),
      totalPrice: (newPrice -= product.price),
    };
  }

  return newData;
};
