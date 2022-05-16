import Title from "../UI/Title/Title";
import CatergorieItem from "./CatergorieItem";
import PaddingContainer from "../UI/PaddingContainer/PaddingContainer";

import { categories } from "../../lib/data";
import classes from "./Catergories.module.css";

const Catergories = () => {
  return (
    <PaddingContainer>
      <Title title="Categories" />
      <div className={classes.catergories}>
        {categories.map((category) => (
          <CatergorieItem key={category.id} category={category} />
        ))}
      </div>
    </PaddingContainer>
  );
};

export default Catergories;
