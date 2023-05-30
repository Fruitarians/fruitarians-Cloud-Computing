const router = require('express').Router()

const { body } = require('express-validator')

const authController = require('../controllers/authController')
const isAuth = require('../middleware/is-auth')

const { localLimiter, loginReqLimiter } = require('../middleware/rate-limiter')

// firestore
const db = require('../database/db')


// * ------------------------------- route ------------------------------- * //


// *? ------------------------------- CONNECTION CHECK ------------------------------- * //
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
            data: {
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





// * ------------------------------- MAIN ROUTING------------------------------- * //


router.post('/login', loginReqLimiter, localLimiter, authController.login)


router.post('/signup',[
    body('email')
        .custom((value, {req}) => {
            return (async () => {
                const user = await db.collection('users').where('email', '==', value).limit(1).get()
                if(!user.empty) {
                    throw new Error('Email sudah digunakan, coba email lain.')
                }
            })()
        }),
    body('password')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        }), ], authController.signup)


router.post('/logout', isAuth,  authController.logout)




module.exports = router