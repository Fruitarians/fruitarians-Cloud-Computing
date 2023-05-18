// * -------------------------------- Route Doc -------------------------------- * //
// *? catatan
// *? berisi route untuk fungsi khusus dari role toko -> misal untuk CRUD buah dll
// *? gunakan base endpoint -> /user/toko/ -> untuk akses fitur khusus -> misal untuk akses info toko misalnya tetap gunakan base endpoint biasanya pada /user/ atau /auth/

const router = require('express').Router()

const processFile = require('../middleware/upload')

const tokoController = require('../controllers/tokoController')
const isAuth = require('../middleware/is-auth')

// * ------------------------------- route ------------------------------- * //

// * CRUD BUAH

router.get('/buah/:idBuah', isAuth, tokoController.detailBuah)

router.get('/buah',  isAuth, tokoController.getAllBuah)

// *? gunakan processFile
router.post('/buah', processFile, isAuth, tokoController.createBuah)

// *? gunakan processFile
router.patch('/buah', processFile, isAuth, tokoController.editBuah)

router.delete('/buah', isAuth, tokoController.deleteBuah)




module.exports = router