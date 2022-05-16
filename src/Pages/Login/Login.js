import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { asyncLogin } from "../../redux/auth_actions";

import { loginValidatePassword, validateEmail } from "../../lib/validations";
import classes from "../Register/Register.module.css";
import background from "../../assets/banner-1.jpg";

const Login = () => {
  const [email, setEmail] = useState({
    value: "",
    isValid: true,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
  });

  const dispatch = useDispatch();

  const { status, loginError } = useSelector((state) => state.auth);

  const emailChangeHandler = (e) => {
    setEmail({
      value: e.target.value,
      isValid: true,
    });
  };

  const passwordChangeHandler = (e) => {
    setPassword({
      value: e.target.value,
      isValid: true,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail(email.value);
    const passwordIsValid = loginValidatePassword(password.value);

    if (!emailIsValid) {
      setEmail({
        value: email.value,
        isValid: emailIsValid,
      });
      return;
    }

    if (!passwordIsValid) {
      setPassword({
        value: password.value,
        isValid: passwordIsValid,
      });
      return;
    }

    dispatch(
      asyncLogin({
        email: email.value,
        password: password.value,
      })
    );
  };

  return (
    <div
      className={classes.register}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={classes.wrapper}>
        {loginError && <p className={classes.invalid_message}>{loginError}</p>}
        <h3>Login into your account</h3>
        <form onSubmit={submitHandler} noValidate>
          <div className={classes.name}>
            <div className={classes.input}>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                value={email.value}
                onChange={emailChangeHandler}
                autoFocus
              />
              {!email.isValid && (
                <label htmlFor="email">Please Enter A Valid Email</label>
              )}
            </div>
            <div className={classes.input}>
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password.value}
                onChange={passwordChangeHandler}
              />
              {!password.isValid && (
                <label htmlFor="email">Please Enter Your Password</label>
              )}
            </div>
          </div>
          <input
            type="submit"
            value={status === "pending" ? "Please Wait ..." : "Login"}
            disabled={status === "pending"}
            style={{
              cursor: status === "pending" ? "not-allowed" : "pointer",
            }}
          />
        </form>
        <p>
          Doesn't have an account ? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
