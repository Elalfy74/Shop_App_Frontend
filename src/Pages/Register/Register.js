import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { asyncRegister } from "../../redux/auth_actions";

import {
  validateUserName,
  validateEmail,
  validateFirstName,
  validatePassword,
  validateConfirmPassword,
} from "../../lib/validations";
import { errorMessages } from "../../lib/validations";

import classes from "./Register.module.css";
import background from "../../assets/banner-2.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const { status, registerError } = useSelector((state) => state.auth);

  const [firstname, setFirstName] = useState({
    value: "",
    isValid: true,
  });
  const [lastname, setLastname] = useState({
    value: "",
    isValid: true,
  });
  const [username, setUserName] = useState({
    value: "",
    isValid: true,
  });
  const [email, setEmail] = useState({
    value: "",
    isValid: true,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isValid: true,
  });

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
  const firstNameChangeHandler = (e) => {
    setFirstName({
      value: e.target.value,
      isValid: true,
    });
  };
  const lastnameChangeHandler = (e) => {
    setLastname({
      value: e.target.value,
      isValid: true,
    });
  };
  const userNameChangeHandler = (e) => {
    setUserName({
      value: e.target.value,
      isValid: true,
    });
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword({
      value: e.target.value,
      isValid: true,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailIsValid = validateEmail(email.value);
    const passwordIsValid = validatePassword(password.value);
    const fistNameIsValid = validateFirstName(firstname.value);
    const lastNameIsValid = validateFirstName(lastname.value);
    const userNameIsValid = validateUserName(username.value);
    const confirmPasswordIsValid = validateConfirmPassword(
      password.value,
      confirmPassword.value
    );

    if (!fistNameIsValid) {
      setFirstName({
        value: firstname.value,
        isValid: fistNameIsValid,
      });
      return;
    }
    if (!userNameIsValid) {
      setUserName({
        value: username.value,
        isValid: userNameIsValid,
      });
      return;
    }
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
    if (!confirmPasswordIsValid) {
      setConfirmPassword({
        value: confirmPassword.value,
        isValid: confirmPasswordIsValid,
      });
      return;
    }

    dispatch(
      asyncRegister({
        username: username.value,
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
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
        {registerError && (
          <p className={classes.invalid_message}>{registerError}</p>
        )}
        <h3>Create an account</h3>
        <form onSubmit={submitHandler}>
          <div className={classes.name}>
            <div className={classes.input}>
              <input
                id="firstname"
                type="text"
                placeholder="First Name"
                value={firstname.value}
                onChange={firstNameChangeHandler}
                autoComplete="firstname"
                autoFocus
              />
              {!firstname.isValid && (
                <label htmlFor="firstname">
                  {errorMessages.firstNameMessage}
                </label>
              )}
            </div>
            <div className={classes.input}>
              <input
                id="lastname"
                type="text"
                placeholder="Last Name"
                value={lastname.value}
                onChange={lastnameChangeHandler}
                autoComplete="lastname"
              />
              {!lastname.isValid && (
                <label htmlFor="lastname">
                  {errorMessages.firstNameMessage}
                </label>
              )}
            </div>
          </div>
          <div className={classes.name}>
            <div className={classes.input}>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username.value}
                onChange={userNameChangeHandler}
                autoComplete="username"
              />
              {!username.isValid && (
                <label htmlFor="username">
                  {errorMessages.userNameMessage}
                </label>
              )}
            </div>
            <div className={classes.input}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email.value}
                onChange={emailChangeHandler}
                autoComplete="email"
              />
              {!email.isValid && (
                <label htmlFor="email">{errorMessages.emailMessage}</label>
              )}
            </div>
          </div>
          <div className={classes.name}>
            <div className={classes.input}>
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
                value={password.value}
                onChange={passwordChangeHandler}
              />
              {!password.isValid && (
                <label htmlFor="password">
                  {errorMessages.passwordMessage}
                </label>
              )}
            </div>
            <div className={classes.input}>
              <input
                id="confirm-password"
                type="password"
                autoComplete="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword.value}
                onChange={confirmPasswordHandler}
              />
              {!confirmPassword.isValid && (
                <label htmlFor="confirm-password">
                  {errorMessages.confirmPasswordMessage}
                </label>
              )}
            </div>
          </div>
          <p>
            By Creating an account. i consent to the processing of my personal
            data in accrodance with the <span>Privacy Policy</span>
          </p>
          <input
            type="submit"
            value={status === "pending" ? "Please Wait ..." : "Create Account"}
            disabled={status === "pending"}
            style={{
              cursor: status === "pending" ? "not-allowed" : "pointer",
            }}
          />
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
