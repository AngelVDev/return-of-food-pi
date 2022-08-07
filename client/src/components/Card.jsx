/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoods } from "../redux/actions";
// import "../styles/components.css";

const Card = ({ currentRecipes }) => {
  const foods = useSelector((state) => state.allFoods);
  const regex = new RegExp("[a-z]");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  return (
    <>
      {currentRecipes?.map((d) => (
        <div className="card" key={d.id}>
          <h1>
            <Link style={{ textDecoration: "none" }} to={"/details/" + d.id}>
              {d.title}
            </Link>
          </h1>
          <div className="infoCard">
            <p>
              {regex.test(d.id) === true
                ? d?.diets?.map((diet) => (
                    <span className="dietCard" key={diet.name + "id"}>
                      {diet.name}
                    </span>
                  ))
                : d?.diets?.map((diet) => (
                    <span className="dietCard" key={diet + "id"}>
                      {diet}
                    </span>
                  ))}
            </p>
            <p>Lifespan: {d.lifespan}</p>
            <h2>{d.hScore}</h2>
          </div>
          <img src={d?.image} preload="true" alt="cardimgerror" />
        </div>
      ))}
    </>
  );
};
export default Card;
