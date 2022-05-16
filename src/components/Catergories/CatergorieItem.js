import Button from "../UI/Button/Button";
import classes from "./CatergorieItem.module.css";

const CatergorieItem = ({ category }) => {
  return (
    <div className={classes.category}>
      <img src={category.img} alt="" />
      <div className={classes.description}>
        <h3>{category.title}</h3>
        <Button path="/products" value="Shop Now" className={classes.btn} />
      </div>
    </div>
  );
};

export default CatergorieItem;
