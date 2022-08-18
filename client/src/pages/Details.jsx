import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { clear, deleteById, getDetails } from "../redux/actions";
import "../styles/pages.css";

const Details = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const history = useHistory();
  const recs = useSelector((state) => state.foodDetail);
  const regex = new RegExp("[a-z]");

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
  console.log(recs);

  if (recs) {
    return (
      <div className="detailContainer">
        <h1>Detailed Info</h1>
        <h2 className="titleDetail">{recs.title}</h2>
        <img
          className="foodPik"
          src={
            recs.image
              ? recs.image
              : "https://i.pinimg.com/564x/00/1e/ed/001eed88d8244f464e8b525fdcd516de.jpg"
          }
          alt="comida"
        />
        <div className="infoDetail">
          <p dangerouslySetInnerHTML={{ __html: recs.summary }} />
          {recs.steps ? (
            <p className="steps" alt="Steps">
              <b>Steps: </b>
              {recs.steps?.map((e) => (
                <ul>
                  <li>{e}</li>
                </ul>
              ))}
            </p>
          ) : null}
          <b>
            <p alt="H.Score">Healthiness: {recs.hScore} </p>
          </b>
          {recs.price && (
            <b>
              <p className="priceDiv" alt="Price">
                Price: ${recs.price}{" "}
              </p>
            </b>
          )}
          <p>
            <b>Diet types: </b>

            {regex.test(recs.id) === true
              ? recs.diets?.map((diet) => (
                  <span id="dietSpanDetail" key={diet.name + "id"}>
                    {diet.name}
                  </span>
                ))
              : recs.diets?.map((el) => (
                  <span key={recs.id + Math.random()} id="dietSpanDetail">
                    {el}
                  </span>
                ))}
          </p>
        </div>
        {recs.id?.length > 10 ? (
          <button className="delButton" onClick={(e) => handleDelete(e, id)}>
            Delete
          </button>
        ) : null}
        <button onClick={handleClick} className="backButton">
          Ritorno
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Details;
