import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Product from "../Product/Product";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import classes from "./ProductsList.module.css";

const sortProducts = (products, sort) => {
  if (products.length === 0) return;
  return products.sort((productA, productB) => {
    if (sort === "asc") {
      return productA.price - productB.price;
    } else if (sort === "dsc") {
      return productB.price - productA.price;
    } else {
      return productA._id - productB._id;
    }
  });
};

const ProductsList = ({ productItems, status, filters }) => {
  const [filteredProducts, setFilteredproducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sort = queryParams.get("sort");

  const { size, color } = filters;

  useEffect(() => {
    if (size && color) {
      setFilteredproducts(
        productItems.filter(
          (product) =>
            product.size.includes(size) && product.color.includes(color)
        )
      );
    } else if (size) {
      setFilteredproducts(
        productItems.filter((product) => product.size.includes(size))
      );
    } else if (color) {
      setFilteredproducts(
        productItems.filter((product) => product.color.includes(color))
      );
    } else {
      setFilteredproducts(productItems);
    }
  }, [productItems, size, color, sort]);

  sortProducts(filteredProducts, sort);

  if (status === "error") {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.products}>
          {filteredProducts.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsList;
