import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createFood, getDiets } from "../redux/actions";

function validateForms(input) {
  const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);
  let error = {};
  if (input.title.length < 1) {
    error.title = "Name required";
  }
  if (input.summary.length <= 10) {
    error.summary = "Summary must be at least 10 characters, please";
  }
  if (input.score <= 0) {
    error.score = "Score above zero, please";
  }
  if (input.hScore <= 0) {
    error.hScore = "Healthiness above zero, please";
  }
  if (input.steps.length < 0) {
    error.steps = "At least one step, please";
  }
  // if (regex.test(input.image) === false) {
  //   error.image =
  //     "Format your image to something more friendly (png/jpg), then come back";
  // }
  if (!input.diets) {
    error.diets = "Select at least one type of diet";
  }
  return error;
}

const Creator = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const history = useHistory();
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    hScore: "",
    steps: [],
    diets: [],
  });
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validateForms({ ...input, [e.target.name]: e.target.value }));
  };
  const handleSelect = (e) => {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        diets: [...input.diets, e.target.value],
      });
    } else {
      setInput({ ...input });
    }
  };
  const handleDelete = (e) => {
    setInput({
      ...input,
      diets: input.diets.filter((t) => t !== e),
    });
  };

  const handleClick = () => {
    history.push("/home");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFood(input));
    alert("¡DI MOLTO!");
    setInput({
      title: "",
      summary: "",
      score: "",
      hScore: "",
      steps: [],
      diets: [],
    });
  };
  if (diets) {
    return (
      <div className="creatorContainer">
        <h1>Submitting your secrets</h1>
        <form className="formCon" onSubmit={(e) => handleSubmit(e)}>
          <label>
            TITLE
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="title"
              type="text"
            />
            {error.title && <p className="error">{error.title} </p>}
          </label>
          <label>
            SUMMARY
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="summary"
              type="text"
            />
            {error.summary && <p className="error">{error.summary} </p>}
          </label>
          <label>
            STEPS
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="steps"
              type="text"
            />
            {error.steps && <p className="error">{error.steps} </p>}
          </label>
          <label>
            SCORE
            <input
              className="inputStyle"
              name="score"
              onChange={(e) => handleChange(e)}
              type="number"
            />
            {error.score && <p className="error">{error.score} </p>}
          </label>
          <label>
            HEALTHINESS
            <input
              className="inputStyle"
              onChange={(e) => handleChange(e)}
              name="hScore"
              type="number"
            />
            {error.hScore && <p className="error">{error.hScore} </p>}
          </label>
          {/* <label>
            IMAGE
            <input
              className="inputStyle"
              name="image"
              onChange={(e) => handleChange(e)}
              type="url"
            />
            {error.image && <p className="error">{error.image} </p>}
          </label> */}
          <label>
            DIETS
            <select
              className="inputStyle"
              name="diets"
              onChange={(e) => handleSelect(e)}
              id="dietSelection"
            >
              <option value={null}>-</option>
              {diets?.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            {error.diets && <p className="error">{error.diets} </p>}
            {input.diets.length > 0 && (
              <div className="selectedDiets" key="selectedDiets">
                <label>Selected diets:</label>
                {input.diets.map((e) => (
                  <button
                    className="dietButton"
                    key={e + "Key"}
                    onClick={() => handleDelete(e)}
                  >
                    {e} x
                  </button>
                ))}
              </div>
            )}
          </label>
          <button
            className="sendButton"
            disabled={Object.keys(error).length}
            type={
              Object.keys(error).length || Object.keys(!error)
                ? "none"
                : "submit"
            }
          >
            {Object.keys(error).length || Object.keys(!error)
              ? "UNAVAILABLE"
              : "SEND"}
          </button>
        </form>
        <button className="backBtn" onClick={handleClick}>
          Ritorno
        </button>
      </div>
    );
  } else {
    return <div>NOTHING HERE, BRO</div>;
  }
};

export default Creator;
