const initialState = {
  foods: [], //copia burda para hacerle magia
  allFoods: [], //los buenos foods
  diets: [],
  foodDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_FOODS":
      return {
        ...state,
        foods: action.payload,
        allFoods: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_QUERY":
      return {
        ...state,
        allFoods: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        foodDetail: action.payload,
      };
    case "POST_FOOD":
      return {
        ...state,
      };
    case "DELETE_BY_ID":
      return {
        ...state,
      };
    case "FILTER_SOURCE":
      const copy = [...state.foods];
      const bySource =
        action.payload === "MIXED"
          ? state.foods
          : action.payload === "DB"
          ? copy.filter((el) => el.createdInDb)
          : copy.filter((el) => !el.createdInDb);
      return {
        ...state,
        allFoods: bySource,
      };
    case "SORT_HSCORE":
      const falseFoods = [...state.foods];

      const sortWait =
        action.payload === "Low"
          ? falseFoods.sort((a, b) => {
              if (1 * a.hScore > 1 * b.hScore) {
                return 1;
              }
              if (1 * b.hScore > 1 * a.hScore) {
                return -1;
              }
              return 0;
            })
          : action.payload === "High"
          ? falseFoods.sort((a, b) => {
              if (1 * a.hScore > 1 * b.hScore) {
                return -1;
              }
              if (1 * a.hScore > 1 * b.hScore) {
                return 1;
              }
              return 0;
            })
          : falseFoods;
      return {
        ...state,
        allFoods: sortWait,
      };
    case "SORT_TITLE":
      const copeeFoods = [...state.foods];
      const sorted =
        action.payload === "ASC"
          ? state.foods.slice().sort((a, b) => {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : action.payload === "DSC"
          ? state.foods.slice().sort((a, b) => {
              if (a.title > b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            })
          : copeeFoods;
      return {
        ...state,
        allFoods: sorted,
      };
    case "FILTER_DIETS":
      const structuredCopy = [...state.foods];
      console.log(structuredCopy);
      const filteredByDiet =
        action.payload === "ALL"
          ? state.foods
          : structuredCopy.filter((recipes) =>
              recipes?.diets?.map((t) => t).includes(action.payload)
            );
      return {
        ...state,
        allFoods: filteredByDiet,
      };
    case "CLEAR":
      return {
        ...state,
        foodDetail: [],
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
