import { useState } from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SliderItem from "./SliderItem";

import { sliderItems } from "../../lib/data";
import classes from "./Slider.module.css";

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prevState) =>
      prevState === sliderItems.length - 1 ? 0 : prevState + 1
    );

  const prevSlide = () =>
    setCurrent((prevState) =>
      prevState === 0 ? sliderItems.length - 1 : prevState - 1
    );

  const styling = {
    transform: `translateX(${current * -100}vw)`,
  };

  return (
    <div className={`${classes.wrapper}`}>
      <ArrowBack className={classes.left_arrow} onClick={prevSlide} />
      <div className={classes.slider_wrapper} style={styling}>
        {sliderItems.map((slide) => (
          <SliderItem key={slide.id} slide={slide} />
        ))}
      </div>
      <ArrowForward className={classes.right_arrow} onClick={nextSlide} />
    </div>
  );
};

export default Slider;
