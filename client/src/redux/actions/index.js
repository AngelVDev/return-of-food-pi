import axios from "axios";

export function getFoods() {
  return function (dispatch) {
    axios.get("/recipes").then((response) => {
      return dispatch({
        type: "GET_FOODS",
        payload: response.data,
      });
    });
  };
}
export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get("/diets", {});
    dispatch({ type: "GET_TEMPS", payload: json.data });
  };
}
export function getQFoods(title) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/recipes?title=${title}`);
      return dispatch({
        type: "GET_QUERY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios.get("/details/" + id);
    dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
export let createFood = (payload) => {
  return async (dispatch) => {
    try {
      let json = await axios.post("/recipes", payload);
      return dispatch({
        type: "POST_FOOD",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function orderByTitle(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SORT_TITLE",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function showCreated(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FILTER_SOURCE",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function filterByDiets(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FILTER_DIETS",
        payload,
      });
    } catch (err) {
      return console.log(err);
    }
  };
}
export function orderByHealthiness(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SORT_HSCORE",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/details/${id}/delete`);
      return dispatch({ type: "DELETE_BY_ID", payload: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function clear() {
  return {
    type: "CLEAR",
  };
}
