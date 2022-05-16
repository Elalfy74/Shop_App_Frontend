import classes from "./Filter.module.css";

const sortOptions = [
  {
    label: "Newest",
    value: "new",
  },
  {
    label: "Price (asc)",
    value: "asc",
  },
  {
    label: "Price (desc)",
    value: "dsc",
  },
];

const colorOptions = [
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Black",
    value: "black",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "White",
    value: "white",
  },
];

const sizeOptions = [
  {
    label: "M",
    value: "M",
  },
  {
    label: "L",
    value: "L",
  },
  {
    label: "XL",
    value: "XL",
  },
];

const Filter = ({ onChangeSort, onChangeFilter }) => {
  const sortHandler = (e) => onChangeSort(e.target.value);

  const filterHandler = (e) => onChangeFilter(e.target.name, e.target.value);

  return (
    <div className={classes.filters}>
      <div className={classes.filter_product}>
        <h2>Filter Products</h2>
        <div className={classes.color_size}>
          <select defaultValue="color" name="color" onChange={filterHandler}>
            <option disabled value="color">
              Color
            </option>
            {colorOptions.map((color) => (
              <option value={color.value} key={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <select defaultValue="size" name="size" onChange={filterHandler}>
            <option disabled value="size">
              Size
            </option>
            {sizeOptions.map((size) => (
              <option value={size.value} key={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={classes.filter_product}>
        <h2>Sort Products</h2>
        <select onChange={sortHandler}>
          {sortOptions.map((sort) => (
            <option value={sort.value} key={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
