const router = require('express').Router()

const { body } = require('express-validator')

const authController = require('../controllers/authController')
const isAuth = require('../middleware/is-auth')

const { localLimiter, loginReqLimiter } = require('../middleware/rate-limiter')

// firestore
const db = require('../database/db')


// * ------------------------------- route ------------------------------- * //

// * GET

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Success Connect"
    })
})



router.get('/user', isAuth, async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()
        res.status(200).json({
            errors:false,
            message : 'User LogIn',
            user: {
                id: req.userId,
                name: user.name,
                role: user.role
            }
        })
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500
        }
        next(e)
    }
})





// * POST
router.post('/login', [
    body('email', 'Gunakan format email yang sesuai!')
        .isEmail()
        .normalizeEmail()
], loginReqLimiter, localLimiter, authController.login)





router.post('/signup',[
    body('email', 'Gunakan format email yang sesuai!')
        .isEmail()
        .normalizeEmail()
        .custom((value, {req}) => {
            return (async () => {
                const user = await db.collection('users').where('email', '==', value).limit(1).get()
                if(!user.empty) {
                    throw new Error('Email sudah digunakan, coba email lain.')
                }
            })()
        }),
    body('password', 'Password harus setidaknya mengandung 1 angka dan huruf Kapital dengan minimal sepanjang 6 karakter')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Password konfirmasi tidak sesuai')
            }
            return true
        }),
    body('name')
        //.isAlphanumeric().withMessage("Nama harus berupa huruf/string!")
        .isLength({min : 4}).withMessage('Nama minimal mengandung 4 karakter')
        .trim()
        .not()
        .isEmpty()
], authController.signup)



router.post('/logout', isAuth,  authController.logout)


module.exports = router