import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./ProductsPage.module.css";
import AllProducts from "../../components/AllProducts/AllProducts";
import Filter from "../../components/ProductsPage/Filter";
const ProductsPage = () => {
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
    <div className="container">
      <div className={classes.product_page}>
        <Filter />
        <AllProducts
          productItems={productItems.items}
          status={productItems.status}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
