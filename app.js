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

//const lokasiRoutes = require('./routes/lokasi')

//* ------------------------------- app config ------------------------------- *//

// *! rotate logging config (config seperti di bawah gabisa di[alao do App Eninge/ Cyclic)
// const accessLogStream = rotating_file_stream.createStream('access.log', {
//     interval : '1d',
//     path : path.join(__dirname, 'logs')
// })

// * swagger config
const swaggerUIOptions = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: "Capstone API",
            version : "1.0.0",
            description: "sing penting yakin!"
        },
        servers : [
            {
                url: '{protocol}://localhost:' + PORT,
                variables: {
                    protocol: {
                        enum: [
                            '', 'http', 'https'
                        ]
                    }

                }
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
app.use(bodyParser.urlencoded({ extended: false })); //*! karena ada beberapa endpoint akan terima request multipart/form-data
app.use(cors())

app.use( helmet({
        contentSecurityPolicy: false, // disable content security policy
        hidePoweredBy: true, // hide X-Powered-By header
        hsts: false, // { maxAge: 31536000, includeSubDomains: true }, // enable HSTS with maxAge 1 year and includeSubDomains
        noCache: true, // enable noCache header
        referrerPolicy: { policy: 'no-referrer' } // set referrer policy to no-referrer
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

//app.use(lokasiRoutes)

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
        console.log('Connected to port ' + PORT)
    } catch (e) {
        console.log(e)
    }
}
connectServer()