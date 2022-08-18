/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFoods } from "../redux/actions";
import "../styles/components.css";

const Card = ({ currentRecipes }) => {
  const foods = useSelector((state) => state.allFoods);
  const regex = new RegExp("[a-z]");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  if (foods.length) {
    return (
      <>
        {currentRecipes?.map((d) => (
          <div className="card" key={d.id}>
            <h1 className="title">
              <Link
                style={{ textDecoration: "none", color: "#FFF8F0" }}
                to={"/details/" + d.id}
              >
                {d.title}
              </Link>
            </h1>
            <div className="flipCard">
              <div className="flipFront">
                <div className="infoCard">
                  <p>
                    {regex.test(d.id) === true
                      ? d?.diets?.map((diet) => (
                          <li className="dietCard" key={diet.name + "id"}>
                            {diet.name}
                          </li>
                        ))
                      : d?.diets?.map((diet) => (
                          <li className="dietCard" key={diet + "id"}>
                            {diet}
                          </li>
                        ))}
                  </p>
                  <h2>Healthiness: {d.hScore} 👌 </h2>
                </div>
              </div>
              <div className="flipBack">
                <img
                  className="backImg"
                  src={
                    d.image
                      ? d.image
                      : "https://www.gastrotradicional.com/wp-content/uploads/2020/12/pastel-de-papa-3.jpg"
                  }
                  alt="cardimgerror"
                />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div>
        <h1 style={{ color: "white", height: "55vh", marginTop: "40%" }}>
          Nothing in here
        </h1>
      </div>
    );
  }
};
export default Card;
