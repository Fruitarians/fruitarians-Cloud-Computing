const router = require('express').Router()

const isAuth = require('../middleware/is-auth')

const beritaController = require('../controllers/beritaController')

// * ------------------------------- route ------------------------------- * //

router.get('/', isAuth, beritaController.getBerita)


module.exports = router