import React from "react";
import classes from "./LoadingSpinner.module.css";
const LoadingSpinner = () => {
  return (
    <div className={classes.center}>
      <div className={classes.loading}></div>
    </div>
  );
};

export default LoadingSpinner;
