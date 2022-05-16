import { authActions } from "./auth_reducer";
import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_BASE_URL;

export const asyncLogin = (userInput) => {
  return async (dispatch) => {
    dispatch(authActions.setStatus({ status: "pending" }));

    try {
      const result = await axios.post(`${BACKEND_DOMAIN}auth/login`, {
        email: userInput.email,
        password: userInput.password,
      });
      const token = result.data;

      if (result.status === 200) {
        dispatch(authActions.onLoggedIn({ token }));
        dispatch(authActions.setStatus({ status: "success" }));
      }
    } catch (err) {
      dispatch(
        authActions.setStatus({
          status: "error",
          loginError: "Invalid Mail Or Password",
        })
      );
    }
  };
};

export const asyncRegister = (userInput) => {
  return async (dispatch) => {
    dispatch(authActions.setStatus({ status: "pending" }));

    try {
      const result = await axios.post(`${BACKEND_DOMAIN}auth/register`, {
        username: userInput.username,
        email: userInput.email,
        firstname: userInput.firstname,
        lastname: userInput.lastname,
        password: userInput.password,
      });
      const token = result.data;

      if (result.status === 201) {
        dispatch(authActions.onLoggedIn({ token }));
        dispatch(authActions.setStatus({ status: "success" }));
      }
    } catch (err) {
      dispatch(
        authActions.setStatus({
          status: "error",
          registerError: err.response.data,
        })
      );
    }
  };
};
