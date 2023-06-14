//* ---------------- Module Import & Dependencies ---------------- *//
require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
// * monitor & logging
const expressStatusMonitor = require('express-status-monitor')
// * global rate limiter
const globalRateLimiter = require('./middleware/rate-limiter').globalLimiter

//* Const
const PORT = process.env.PORT


//* Routes Import
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const tokoRoutes = require('./routes/toko')
const fileRoutes = require('./routes/file')
const buahRoutes = require('./routes/buah')
const articleRoutes = require('./routes/article')
const vendorSubs = require('./routes/vendor')

//* ------------------------------- app config ------------------------------- *//

// * swagger config
const swaggerUIOptions = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: "Fruitarians API",
            version : "1.0.0",
            description: "Fruitarians API Documentation (Bangkit Product Based Capstone Project - C23PS448) <br><br>To access the endpoints that require authorization, please set up authentication first using bearerAuth with an access token in the form of a JWT obtained from the /auth/login endpoint. <b>This API is used to integrate the Frontend with the noSQL Database</b>. <br><br>Fruitarians Object Model is as follows: <ul> <li>Users - A user of the system, based on roles property, it is divided into three categories: user, store, and vendor, each with different limitations as well.</li> <li>Buah - The products are owned by users with the toko role, and users with the toko role have CRUD access to this model</li> <li>Vendor Subs - The list of stores subscribed to users with the vendor role, and users with the vendor role have CRUD access to this model</li> <li>Carts - List of fruit user need to save and buy, one cart document contain fruit information that user add from just one 'toko' role, if user use 'add cart' to 3 fruit from 3 different 'toko', user will have 3 cart document</li>  </ul> ",
            contact:
                {
                    name: 'Fruitarians - C23-PS448',
                    email: 'A210DSX3159@bangkit.academy',
                    url: 'https://github.com/Fruitarians'
                }
        },
        servers : [
            {
                url:'https://capstone-project-387215.et.r.appspot.com',
                description:  'Frutarians Main API'
            },
            {
                url: 'https://fruitarians-model-cwdelhrmna-et.a.run.app/api',
                description:  'Machine Learning Model API'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./swagger-js-doc/*.js']
}
const swaggerSpecs = swaggerJSDoc(swaggerUIOptions)

// * app config
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use( helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    hsts: false,
    noCache: true,
    referrerPolicy: { policy: 'no-referrer' }
}) );

app.use(globalRateLimiter)

app.use(expressStatusMonitor())


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))


app.use('/auth', authRoutes)
app.use('/user/toko', tokoRoutes)
app.use('/user', userRoutes)
app.use('/file', fileRoutes)
app.use('/buah', buahRoutes)
app.use('/articles', articleRoutes)
app.use('/vendor', vendorSubs)

//* global errorHandling
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({
        errors: true,
        message: message
    })
})

//* ------------------------------ start server ------------------------------ *//
async function connectServer() {
    try {
        app.listen(PORT)
    } catch (e) {
        console.log(e)
    }
}
connectServer()