const { Router } = require("express");

const router = Router();
const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("../controllers/recipeController");
const regex = new RegExp(/^[a-z0-9._]+$/i);

router.get("/recipes", async (req, res) => {
  try {
    const { title } = req.query;

    let recipesTotal = await getAllRecipes();

    if (title) {
      const recipeTitle = recipesTotal.filter((el) =>
        el.title.toLowerCase().includes(title.toLowerCase())
      );

      recipeTitle.length
        ? res.status(200).send(recipeTitle)
        : res.status(404).send("Not found");
    } else {
      res.status(200).json(recipesTotal);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipes = await getAllRecipes();
  try {
    const recipeById = await recipes.find((r) => `${r.id}` === id);
    // Intento traer el elemento que coincida por id desde la API
    // o desde la primaryKey() en la base de datos
    if (id.includes("-")) {
      const recipeByDB = await Recipe.findByPk(id, {
        include: [
          {
            model: Diet,
            as: "diets",
            through: { attributes: [] },
          },
        ],
      });

      recipeByDB
        ? res.status(200).json(recipeByDB)
        : res.status(404).send("INVALID ID");
    } else {
      res.status(200).json(recipeById);
    }
  } catch (err) {
    console.log("\x1b[36m%s\x1b[0m", err);
  }
});
router.post("/recipes", async (req, res) => {
  const { title, summary, score, hScore, steps, diets, price } = req.body;
  try {
    const recipeNew = await Recipe.create({
      title,
      summary,
      score,
      hScore,
      steps: [steps],
      price,
      diets,
    });
    const dietDb = await Diet.findAll({ where: { name: diets } });
    recipeNew.addDiet(dietDb);
    res.status(201).json(recipeNew);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/delete", async (req, res) => {
  try {
    await Recipe.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json({ msg: "Deleted recipe" });
  } catch (err) {
    console.log(err);
  }
});
// router.put('/:id/modify', async (req, res) => {
//   const {
//     id, title, summary, score, hScore, steps, price,
//   } = req.body;
//   const recipeByDB = await Recipe.findByPk(id);
//   try {
//     if (recipeByDB) {
//       const change = await Recipe.update(
//         title,
//         summary,
//         score,
//         hScore,
//         steps,
//         price,
//         {
//           where: id,
//         },
//       );
//       res.send(change);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
