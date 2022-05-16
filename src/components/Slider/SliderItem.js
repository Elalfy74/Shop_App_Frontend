import Button from "../UI/Button/Button";
import classes from "./SliderItem.module.css";

const SliderItem = ({ slide }) => {
  return (
    <div
      className={classes.slider}
      style={{
        backgroundColor: slide.bg,
      }}
    >
      <img src={slide.img} alt="slide_img" />
      <div className={classes.info}>
        <h1>{slide.title}</h1>
        <p>{slide.desc}</p>
        <Button path={slide.path} value="Shop Now" className={classes.btn} />
      </div>
    </div>
  );
};

export default SliderItem;
