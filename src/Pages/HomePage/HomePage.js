import { useEffect, useState } from "react";

import Container from "../../components/UI/Container/Container";
import PaddingContainer from "../../components/UI/PaddingContainer/PaddingContainer";
import Slider from "../../components/Slider/Slider";
import Catergories from "../../components/Catergories/Catergories";
import AllProductsBanner from "../../components/Layout/AllPrdocutsBanner";
import Title from "../../components/UI/Title/Title";
import ProductsList from "../../components/Products/ProductsList/ProductsList";
import ContactUsBanner from "../../components/Layout/ContactUsBanner";

import axios from "axios";

const HomePage = () => {
  const [productItems, setProductItems] = useState({
    status: "pending",
    products: [],
  });
  const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productItems = await axios.get(
          `${BACKEND_DOMAIN}products/?new=true`
        );
        setProductItems({
          status: "success",
          products: productItems.data,
        });
      } catch (err) {
        setProductItems((prevState) => ({ ...prevState, status: "error" }));
        console.log(err);
      }
    };
    fetchProducts();
  }, [BACKEND_DOMAIN]);

  return (
    <div>
      <Slider />
      <Container>
        <Catergories />
      </Container>
      <AllProductsBanner />
      <Container>
        <PaddingContainer>
          <Title title="recently arrived" />
          <ProductsList
            productItems={productItems.products}
            status={productItems.status}
            filters={{}}
          />
        </PaddingContainer>
      </Container>
      <ContactUsBanner />
    </div>
  );
};

export default HomePage;
