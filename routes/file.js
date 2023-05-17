const router = require('express').Router()

const fileController = require('../controllers/fileController')
const isAuth = require('../middleware/is-auth')

/// * ------------------------------- route ------------------------------- * //

router.get('/',  fileController.readFile)

router.get('/:name',  fileController.donwloadFile)

router.post('/upload',  fileController.uploadFile)


module.exports = router