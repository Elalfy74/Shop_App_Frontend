import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_BASE_URL;

export async function getCartData(token) {
  const response = await axios.get(`${BACKEND_DOMAIN}carts`, {
    headers: {
      "x-auth-token": token,
    },
  });

  let data = response.data;
  if (!response.data) {
    try {
      data = await createCart(token);
    } catch (err) {
      console.log(err);
    }
  }
  return data;
}

export async function createCart(token) {
  const cart = JSON.parse(localStorage.getItem("persist:cart")).data;
  const cartData = JSON.parse(cart);

  const response = await axios.post(
    `${BACKEND_DOMAIN}carts`,
    {
      products: cartData.items,
      totalQuantity: cartData.totalQuantity,
      totalPrice: cartData.totalPrice,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  const data = response.data;
  if (response.status !== 200) {
    throw new Error(response.message);
  }
  return data;
}

export async function updateCart(token, cart) {
  const response = await axios.put(
    `${BACKEND_DOMAIN}carts`,
    {
      products: cart.items,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  const data = response.data;
  return data;
}
