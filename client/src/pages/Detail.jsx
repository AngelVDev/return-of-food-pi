import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clear, deleteById, getDetails } from "../store/actions";
import Loader from "./Loader";
import "./styles/Detail.css";

const Detail = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const history = useHistory();
  const recs = useSelector((state) => state.foodDetail);

  useEffect(() => {
    dispatch(clear());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const handleClick = () => {
    history.push("/home");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteById(id));
    alert(recs.title + " deleted from DB");
    history.push("/home");
  };

  if (recs) {
    return (
      <div className="detailContainer">
        <h1>Detailed Info</h1>
        <h2>{recs.title}</h2>
        <img
          src={
            recs.image
              ? recs.image
              : "https://i.pinimg.com/564x/00/1e/ed/001eed88d8244f464e8b525fdcd516de.jpg"
          }
          alt="comida"
        />
        <div>
          <p dangerouslySetInnerHTML={{ __html: recs.summary }} />
          <p alt="Steps">Steps: {recs.steps}</p>
          <p alt="Score">Score: {recs.score} </p>
          <p alt="H.Score">Healthiness: {recs.h_score} </p>
          <p className="priceDiv" alt="Price">
            Price: ${recs.price}{" "}
          </p>
          <p>
            Diet types:{" "}
            <span>
              {!recs.diets
                ? "Not defined"
                : recs.diets.map((el) =>
                    el.length > 1 ? el + ", " : el + "."
                  )}
            </span>
          </p>
        </div>
        {recs.id?.length > 10 ? (
          <button className="delButton" onClick={(e) => handleDelete(e, id)}>
            Delete
          </button>
        ) : null}
        <button onClick={handleClick}>Ritorno</button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
