import classes from "./PaddingContainer.module.css";

const PaddingContainer = (props) => (
  <div className={classes.padding}>{props.children}</div>
);

export default PaddingContainer;
