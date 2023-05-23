const router = require('express').Router()

const { body } = require('express-validator')

const userController = require('../controllers/userController')
const userRoleController = require('../controllers/userRoleController')

const isAuth = require('../middleware/is-auth')

const emailLimiter = require('../middleware/rate-limiter').emailReqLimiter

const processFile = require('../middleware/upload')


// * ------------------------------- route ------------------------------- * //


// *! ROUTES FOR user-exc doc Dokumentasi File
/**
 * ! catatan --------------------
 * ! merupakan routes untuk endpoint role USER untuk kemampuan khusus dari role USER
 * ! ---------------------------
 */
// *! --------------------------------- BOOKMARK ---------------------------------
router.get('/bookmark', isAuth, userRoleController.getAllBookmark)

router.post('/bookmark', isAuth, userRoleController.postBookmark)

router.delete('/bookmark', isAuth, userRoleController.deleteBookmark)


//*! --------------------------------------------------------------------------------------




// * INFO UTAMA USER

router.get('/info', isAuth, userController.getInfo)

router.get('/:role', isAuth, userController.getAllRole) // *! doc di toko_vendor

router.get('/:role/:id', isAuth, userController.detailInfo) //*! doc di toko_vendor

router.get('/toko/:idToko/:idBuah', isAuth, userController.detailBuah) //*! doc ada di toko_vendor


// *! ketika pakai data input form-data (ada upload IMG) -> gunakan processFile untuk process data gambar dan input
// *? gunakan processFile
router.patch('/info',  processFile, //[
//     body('name')
//         //.isAlphanumeric().withMessage("Nama harus berupa huruf/string!")
//         .isLength({min : 4}).withMessage('Nama minimal mengandung 4 karakter')
//         .trim()
//         .not()
//         .isEmpty()],
    isAuth, userController.changeInfo)





// * POST
router.post('/forget_password', //[
    // body('email', 'Gunakan format email dengan benar!')
    //     .isEmail()
    //     .normalizeEmail()] ,
    emailLimiter, userController.getForgetPasswordToken )





// * PATCH
router.patch('/password', isAuth, [
    body('password_baru', 'Password harus berisi minimal 6 karakter dengan memiliki minimal 1 angka dan 1 karakter uppercase')
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minSymbols: 0,
            minUppercase: 1
        })
    // , body('password_konfir')
    //     .custom((value, {req}) => {
    //         if(value !== req.body.password_baru) {
    //             throw new Error('Password konfirmasi tidak sesuai!')
    //         }
    //         return true
    //     })
],  userController.changePassword)


router.patch('/forget_password',[
    //*! revisi baru ngga pake email
    // body('email', "Masukan format email dengan benar!")
    //     .isEmail()
    //     .normalizeEmail(),
    body('password', 'Password harus setidaknya mengandung 1 angka dan huruf Kapital dengan minimal sepanjang 6 karakter')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        })
    // , body('password_konfir')
    //     .custom((value, {req}) => {
    //         if(value !== req.body.password) {
    //             throw new Error('Password konfirmasi tidak sesuai')
    //         }
    //         return true
    //     }),
], userController.changeForgetPassword )



module.exports = router