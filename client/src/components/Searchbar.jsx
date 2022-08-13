import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQFoods } from "../redux/actions";

const SearchBar = () => {
  let dispatch = useDispatch();
  let [title, setTitle] = useState("");
  let handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    dispatch(getQFoods(title));
  };

  return (
    <div>
      <input
        className="searchInput"
        type="text"
        placeholder="Type here..."
        onChange={(e) => handleInputChange(e)}
      />
      <button className="searchButton">Search</button>
    </div>
  );
};

export default SearchBar;
