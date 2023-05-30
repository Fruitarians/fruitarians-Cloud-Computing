/**
 * ? catatan ----
 * ! ini untuk proses routing controller buah yang berhubungan dengan objek buah secara umum. bukan untuk perubahan buah misal CRUD buah (hal tsb dilakukan di routing /toko/ )
 * !-------
 */

const router = require('express').Router()
const buahController = require('../controllers/buahController')
const isAuth = require('../middleware/is-auth')


// * ------------------------------- route ------------------------------- * //


router.get('/', isAuth , buahController.getAllBuah ) // *? dokumentasi ada di "toko_vendor-doc.js"


module.exports = router