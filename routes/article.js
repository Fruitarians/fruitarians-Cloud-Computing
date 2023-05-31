const router = require("express").Router();

const isAuth = require('../middleware/is-auth')

const articleController = require("../controllers/articleController");

// * ------------------------------- route ------------------------------- * //

router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticlesById);

module.exports = router;