import React from "react";
import classes from "./Filter.module.css";
const Filter = () => {
  return (
    <div className={classes.filters}>
      <div className={classes.filter_product}>
        <h2>Filter Products</h2>
        <div className={classes.color_size}>
          <select defaultValue="color">
            <option disabled value="color">
              Color
            </option>
            <option>Yellow</option>
            <option>Green</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>White</option>
          </select>
          <select defaultValue="size">
            <option disabled value="size">
              Size
            </option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>
      </div>
      <div className={classes.filter_product}>
        <h2>Sort Products</h2>
        <select>
          <option>Newest</option>
          <option>Price (asc)</option>
          <option>Price (desc)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
