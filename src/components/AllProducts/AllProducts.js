import classes from "./AllProducts.module.css";
import Product from "../Product/Product";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const AllProducts = ({ productItems, status }) => {
  return (
    <div>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.products}>
          {productItems.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
