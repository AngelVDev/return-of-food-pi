const { Router } = require("express");
const { dietsAPI } = require("../controllers/dietController");
const Diet = require("../db");
const router = Router();

router.get("/diets", async (req, res) => {
  const diets = await dietsAPI();
  try {
    let allDiets = await Diet.findAll();
    if (!allDiets.length) {
      await Diet.bulkCreate(diets);
      res.status(201).send("Diets CREATED");
    } else {
      res.status(200).json(allDiets);
    }
  } catch (err) {
    res.status(500).send({ msg: err });
  }
});
module.exports = router;
