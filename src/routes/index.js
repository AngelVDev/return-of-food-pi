const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const diets = require("./dietRoute");
const recipes = require("./recipeRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", diets);
router.use("/", recipes);

module.exports = router;
