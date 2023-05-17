require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')
const statusCode = require('../util/response').httpStatus_keyValue

// * firestore
const db = require('../database/db')
const {decode} = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {

        const header = req.get('Authorization')
        if(!header) {
            const err = new Error('no Auth Header')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        function token_not_valid(){
            const err = new Error('Token tidak valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }


        const token = header.split(' ')[1]
        if(!token){
            token_not_valid()
        }

        let decode_token
        try {
            decode_token = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            e.statusCode = statusCode['500_internal_server_error']
            throw e
        }
        if(!decode_token){
            token_not_valid()
        }

        //const user = await User.findById(decode_token.userId)
        let user = (await db.collection('users').doc(decode_token.userId).get()).data()
        if(!user) {
            token_not_valid()
        }

        if( user.token.auth !== decode_token.authToken ){
            token_not_valid()
        }

        req.userId = decode_token.userId
        next()

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}
