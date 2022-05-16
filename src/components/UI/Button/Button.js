import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = ({ value, className, path }) => {
  const allClasses = `${className} ${classes.btn}`;

  return (
    <Link className={allClasses} to={path}>
      {value}
    </Link>
  );
};

export default Button;
