const axios = require("axios");
const { getApiInfo } = require("./recipeController");

const dietsAPI = async () => {
  try {
    const dietsIn = await getApiInfo();

    const dietsOut = await dietsIn
      .map((d) => d.diets)
      .flat()
      .filter(Boolean);
    const [...api] = new Set(dietsOut);
    return api;
  } catch (err) {
    console.log("Diets ERROR => ", err);
  }
};

module.exports = { dietsAPI };
