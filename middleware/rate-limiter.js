const rateLimiter = require('express-rate-limit')
const statusCode = require('../util/response').httpStatus_keyValue

exports.globalLimiter = rateLimiter({
    windowMs: 1000 * 60,
    max : 100,
    handler: (req, res, next) => {
        res.status(statusCode['429_too_many_requests']).json({
            errors : {
                message: "Request Dibatasi, Anda meminta request terlalu banyak, request dibatasi 100 request / menit, silahkan tunggu dan coba lagi."
            }
        })
    }
})



exports.localLimiter = rateLimiter({
    windowMs: 1000 * 60,
    max: 8,
    handler: (req, res, next) => {
        res.status(statusCode['429_too_many_requests']).json({
            errors: {
                message: "Terlalu banyak percobaan, kami hanya membatasi 8 percobaan / menit, silahkan coba lagi nanti! "
            }
        })
    }
})



exports.emailReqLimiter = rateLimiter({
    keyGenerator: function (req) {
        return req.body.email
    },
    windowMs: 1000 * 60 * 5,
    max: 1,
    handler: (req, res, next) => {
        res.status(statusCode['429_too_many_requests']).json({
            errors: {
                message: "Permintaan pengiriman kode baru ke sebuah alamat email dibatasi 1 permintaan tiap 5 menit, silahkan cek email Anda dahulu, kode dalam email berlaku 15 menit"
            }
        })
}
})



exports.loginReqLimiter = rateLimiter({
    keyGenerator: function (req) {
        return req.body.email
    },
    windowMs: 1000 * 60,
    max: 4,
    handler: (req, res, next) => {
        res.status(statusCode['429_too_many_requests']).json({
            errors: {
                message: "Terlalu banyak percobaan login menggunakan satu email, kami membatasi percobaan login dengan 1 email maksimal 4 kali percobaan/ menit, silahkan coba lagi nanti!"
            }
        })
    }
})