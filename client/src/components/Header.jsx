import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import {
  showCreated,
  orderByHealthiness,
  orderByTitle,
  getFoods,
  filterByDiets,
  getDiets,
} from "../redux/actions";

const Header = ({ setCurrentPage }) => {
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  const handleOrderTitle = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByTitle(e.target.value));
  };
  const handleOrderScore = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByHealthiness(e.target.value));
  };
  const handleFilterDiets = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByDiets(e.target.value));
  };
  const handleFilterSrc = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(showCreated(e.target.value));
  };
  const handleReset = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getFoods());
  };
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getFoods());
  }, [dispatch]);
  return (
    <div className="filterContainer">
      <button className="create">
        <Link style={{ textDecoration: "none" }} to="/create">
          {" "}
          Share your recipes
        </Link>
      </button>
      <Searchbar />
      <button className="reset" onClick={(e) => handleReset(e)}>
        RESET
      </button>
      <label className="headerLabel">
        Sort by title
        <select className="headerSelect" onChange={(e) => handleOrderTitle(e)}>
          <option value="">-</option>
          <option value="ASC">A to Z</option>
          <option value="DSC">Z to A</option>
        </select>
      </label>
      <label className="headerLabel">
        Sort by healthiness
        <select className="headerSelect" onChange={(e) => handleOrderScore(e)}>
          <option value="">-</option>
          <option value="Low">Low to hi</option>
          <option value="High">Hi to low</option>
        </select>
      </label>
      <label className="headerLabel">
        Filter by diet
        <select className="headerSelect" onChange={(e) => handleFilterDiets(e)}>
          <option value="ALL">All</option>
          {diets &&
            diets?.map((diet) => {
              return (
                <option key={diet.id} value={diet.name}>
                  {diet.name}
                </option>
              );
            })}
        </select>
      </label>
      <label className="headerLabel">
        Filter by source
        <select className="headerSelect" onChange={(e) => handleFilterSrc(e)}>
          <option value="MIX">Mixed</option>
          <option value="API">API</option>
          <option value="DB">Createds</option>
        </select>
      </label>
    </div>
  );
};

export default Header;
