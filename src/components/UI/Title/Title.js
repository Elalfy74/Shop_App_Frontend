import classes from "./Title.module.css";

const Title = (props) => {
  return <h2 className={classes.main_title}>{props.title}</h2>;
};

export default Title;
