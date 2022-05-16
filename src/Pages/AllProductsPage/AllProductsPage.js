import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../../components/UI/Container/Container";
import PaddingContainer from "../../components/UI/PaddingContainer/PaddingContainer";
import Filter from "../../components/Products/ProductsFilters/Filter";
import ProductsList from "../../components/Products/ProductsList/ProductsList";

import axios from "axios";

const AllProductsPage = () => {
  const [productsList, setProductsList] = useState({
    products: [],
    status: "pending",
  });
  const [filters, setFilters] = useState({});

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cat = pathname.split("/")[2];

  const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_BASE_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productItems = await axios.get(
          cat
            ? `${BACKEND_DOMAIN}products/?category=${cat}`
            : `${BACKEND_DOMAIN}products`
        );
        setProductsList({
          status: "success",
          products: productItems.data,
        });
      } catch (err) {
        setProductsList({ status: "error" });
        console.log(err);
      }
    };
    fetchProducts();
  }, [cat, BACKEND_DOMAIN]);

  const filterHandler = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const sortHandler = (sortType) => {
    navigate(`${pathname}?sort=${sortType}`);
  };

  if (productsList.status === "error") {
    return (
      <div>
        <h1>Something went wrong Please Try Again</h1>
        <button>Try Again</button>
      </div>
    );
  }

  return (
    <Container>
      <PaddingContainer>
        <Filter onChangeSort={sortHandler} onChangeFilter={filterHandler} />
        <PaddingContainer>
          <ProductsList
            productItems={productsList.products}
            status={productsList.status}
            filters={filters}
          />
        </PaddingContainer>
      </PaddingContainer>
    </Container>
  );
};

export default AllProductsPage;
