const router = require('express').Router()

const { body } = require('express-validator')

const userController = require('../controllers/userController')
const userRoleController = require('../controllers/userRoleController')

const isAuth = require('../middleware/is-auth')

const emailLimiter = require('../middleware/rate-limiter').emailReqLimiter

const processFile = require('../middleware/upload')


// * ------------------------------- route ------------------------------- * //


// *! ROUTES untuk "user-exc-doc.js" Dokumentasi File
// *! ---------------------------- DOKUMENTASI ada di "toko_vendor-doc.js" ----------------------------
// * Controller file -> "userRoleController.js"
/**
 * ? catatan --------------------
 * ? merupakan routes untuk endpoint role USER untuk kemampuan khusus dari role USER
 * ? ---------------------------
 */
// *! ------------- BOOKMARK -------------

router.get('/bookmark', isAuth, userRoleController.getAllBookmark)

router.post('/bookmark', isAuth, userRoleController.postBookmark)

router.delete('/bookmark', isAuth, userRoleController.deleteBookmark)


//*! -------------------------------------------------------------------------------------------------




// * INFO UTAMA USER

router.get('/info', isAuth, userController.getInfo)

// *! ---------------------------- DOKUMENTASI ada di "toko_vendor-doc.js" ----------------------------

router.get('/:role', isAuth, userController.getAllRole)

router.get('/:role/:id', isAuth, userController.detailInfo)

router.get('/toko/:idToko/:idBuah', isAuth, userController.detailBuah)

//*! --------------------------------------------------------------------------------------

// * ketika pakai data input form-data (ada upload IMG) -> gunakan "processFile" untuk process data gambar dan input
// *? gunakan processFile
router.patch('/info',  processFile, isAuth, userController.changeInfo)



router.patch('/password', isAuth, [
    body('password_baru', 'Password harus berisi minimal 6 karakter dengan memiliki minimal 1 angka dan 1 karakter uppercase')
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minSymbols: 0,
            minUppercase: 1
        })
    ],  userController.changePassword)



router.post('/forget_password', emailLimiter, userController.getForgetPasswordToken )



router.patch('/forget_password',[
    body('password', 'Password harus setidaknya mengandung 1 angka dan huruf Kapital dengan minimal sepanjang 6 karakter')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        })
], userController.changeForgetPassword )





module.exports = router