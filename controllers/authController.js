require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const statusCode = require('../util/response').httpStatus_keyValue
const { validationResult }  = require('express-validator')

// * firebase import
const db = require('../database/db')


//* -------------------------- controller -------------------------- *//

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('SignUp Gagal, Data tidak sesuai')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const role = req.body.role
        // *! const alamat = req.body.alamat // alamat diubah jadi negara, kota deskripsi
        const negara = req.body.negara
        const kota = req.body.kota
        const deskripsi_alamat = req.body.deskripsi_alamat
        const alamat = {
            negara: negara,
            kota: kota,
            deskripsi_alamat : deskripsi_alamat
        }
        let telepon = req.body.telepon

        if(telepon.startsWith("0")) {
            telepon = telepon.slice(1)
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const user = new User(
            email, hashPassword, name, role, alamat, telepon
        )
        const newUser = {...user}

        if (role !== 'user'){
            // *! createdAt sudah otomatis dibuat oleh objek dan dibuat untuk semua role user dan sekalian juga akan ada field updatedAT
            // const today = new Date();
            // const options = { day: 'numeric', month: 'long', year: 'numeric' };
            // const formattedDate = today.toLocaleDateString('id-ID', options);
            // const createdAt = formattedDate
            //
            // newUser.createdAt = createdAt

            newUser.jam_operasional = null
            newUser.deskripsi = null
            // newUser.gambar_profil = null

            if(role === 'toko'){
                newUser.buah = []
            }
        } else{
            //*! tambahan dengan adanya bookmark maka ketika dibuat akan buat array kosong
            newUser.bookmark = []
        }

        //console.log(newUser)
        await db.collection('users').doc().set(newUser)

        res.status(statusCode['201_created']).json({
            errors: false,
            message : "User Success Created"
            //*? hilangkan data email ketika response
            // , user : {
            //     email : newUser.email
            // }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}





exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    function login_failed(){
        const err = new Error('email / password salah!')
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('email/ password salah!')
            err.statusCode = statusCode['401_unauthorized']
            err.data = errors.array()
            throw err
        }

        let user = await db.collection('users').where('email', '==', email).limit(1).get()
        let userId
        if (user.empty) {
            login_failed()
        } else {
            user = user.docs[0]
            userId = user.id
            user = user.data()
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
            login_failed()
        }

        const authToken = crypto.randomBytes(32).toString('hex')
        const accessToken = jwt.sign({
            email : user.email,
            userId : userId.toString(),
            authToken: authToken
        }, process.env.JWT_SECRET)

        user.token.auth = authToken
        await db.collection('users').doc(userId).update(user)

        res.status(statusCode['200_ok']).json({
            errors: false,
            accessToken : accessToken,
            email : user.email,
            token_type : 'Bearer'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}





exports.logout = async (req, res, next) => {
    try {
        let user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user){
            const err = new Error('Auth Error, failed logout')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        user.token.auth = null
        await db.collection('users').doc(req.userId).update(user)

        res.status(statusCode['202_accepted']).json({
            errors : false,
            status : 'log out',
            email: user.email
        })

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}
