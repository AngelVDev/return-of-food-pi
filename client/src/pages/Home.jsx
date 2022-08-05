import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Home = () => {
  const foods = useSelector((state) => state.allFoods);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [foodsPerPage, setFoodsPerPage] = useState(9);
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentRecipes = foods?.slice(indexOfFirstFood, indexOfLastFood);
  const pagination = (pageNum) => {
    setCurrentPage(pageNum);
  };
  if (foods) {
    return (
      <div>
        <Header setCurrentPage={setCurrentPage} />
        <Card currentRecipes={currentRecipes} />
        <Pagination
          foods={foods}
          foodsPerPage={foodsPerPage}
          pagination={pagination}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Home;
