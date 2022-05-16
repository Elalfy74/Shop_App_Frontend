import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Catergories from "../components/Catergories/Catergories";
import AllProducts from "../components/AllProducts/AllProducts";
// import { productItems } from "../lib/data";
import banner from "../assets/banner.png";
import classes from "./Home.module.css";
import AllProductsBanner from "../components/Layout/AllPrdocutsBanner";

const HomePage = () => {
  const [productItems, setProductItems] = useState({
    status: "pending",
    items: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productItems = await axios.get(
          "http://localhost:4000/api/products"
        );
        setProductItems((prevState) => ({
          ...prevState,
          items: productItems.data,
        }));
      } catch (err) {
        console.log(err);
      }
      setProductItems((prevState) => ({ ...prevState, status: "done" }));
    };
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <Outlet />
      <div>
        <Slider />
        <div className="container">
          <Catergories />
        </div>
        <AllProductsBanner />
        <div className="container">
          <AllProducts
            productItems={productItems.items}
            status={productItems.status}
          />
        </div>
        <div
          className={classes.banner}
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <h1>Contact us Now!</h1>
          <Link to="/contact">Contact US</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
