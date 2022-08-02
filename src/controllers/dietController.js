const axios = require("axios");

const { API_KEY } = process.env;

const dietsAPI = async () => {
  try {
    const api = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    const dietsIn = await api.data.results;

    return api;
  } catch (err) {
    console.log("Diets ERROR => ", err);
  }
};
console.log(dietsAPI());

module.exports = { dietsAPI };
