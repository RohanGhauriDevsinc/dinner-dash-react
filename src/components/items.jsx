import * as React from "react";
import { useState, useEffect } from "react";
import "./items.css";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "./spinner";

function ItemCard(props) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [ItemsList, setItemsList] = useState([]);
  const [filter, setFilter] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  const categoriesUrl = "http://localhost:3000/api/v1/categories";
  const itemsUrl = "http://localhost:3000/api/v1/items";
  const fetchCategoriesList = () => {
    fetch(categoriesUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategoriesList(data);
        setIsLoading(false);
      });
  };
  const fetchItemsList = () => {
    fetch(itemsUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItemsList(data);
      });
  };

  useEffect(() => {
    fetchItemsList();
    fetchCategoriesList();
  }, []);

  const filteredItems = () => {
    if (filter === "default") {
      return ItemsList;
    } else {
      return ItemsList.filter((item) =>
        item.categories.some(
          (category) => filter.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
    console.log(filter, filteredItems());
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <select
            value={filter}
            onChange={handleSelectChange}
            className="cust_input"
            data-bs-theme="dark"
          >
            <option value={"default"}> Show All</option>
            {categoriesList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {filteredItems().map((Item, index) => (
            <div className="d-flex items_card" key={index}>
              <img className="items_img" variant="top" src={Item.image} />
              <div className="d-flex flex-column items_desc">
                <Card.Title>{Item.name}</Card.Title>
                <div className="d-flex category_box">
                  {Item.categories.map((category, index) => (
                    <div className="single_category" key={index}>
                      {category}
                    </div>
                  ))}
                </div>
                <Card.Text>{Item.description}</Card.Text>
                <Card.Text>Rs: {Item.price}</Card.Text>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
export default ItemCard;
