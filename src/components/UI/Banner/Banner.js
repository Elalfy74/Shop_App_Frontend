import Button from "../Button/Button";
import classes from "./Banner.module.css";

const Banner = ({ img, className, title, secondTitle, path, value }) => (
  <div
    className={classes.banner}
    style={{
      backgroundImage: `url(${img})`,
    }}
  >
    <div className={classes.description}>
      <h2>{title}</h2>
      {secondTitle && (
        <p>
          <span>Leave a message,</span> We love to hear from you!
        </p>
      )}
      {path && <Button className={className} path={path} value={value} />}
    </div>
  </div>
);
export default Banner;
