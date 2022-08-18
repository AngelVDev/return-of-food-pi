//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { dietsAPI } = require("./src/controllers/dietController.js");
const { getAllRecipes } = require("./src/controllers/recipeController.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT || 3001, () => {
    getAllRecipes();
    dietsAPI();
    console.log("%s seasoning at 3001"); // eslint-disable-line no-console
  });
});
