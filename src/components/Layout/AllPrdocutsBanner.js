import Banner from "../UI/Banner/Banner";

import classes from "./AllProductsBanner.module.css";
import bannerImg from "../../assets/b16.jpg";

const AllProductsBanner = () => (
  <Banner
    img={bannerImg}
    className={classes.link}
    title="All Products"
    path="/products"
    value="All Products"
  />
);

export default AllProductsBanner;
