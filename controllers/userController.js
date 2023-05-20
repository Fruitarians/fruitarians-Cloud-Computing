require('dotenv').config()
const statusCode = require('../util/response').httpStatus_keyValue
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mailjet = require('node-mailjet').apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET)

// firestore
const db = require('../database/db')

// * CONTROLLER UPLOAD PIC TO CLOUD STORAGE
const fileController = require('./fileController')

//* -------------------------- update controller -------------------------- *//

// *? -- note -> doc di toko_vendor
// * dapatkan info data sederhana dari role toko/ vvendor
exports.getAllRole = async (req, res, next) => {
    try {

        const role = req.params.role // role hanya terima vendor/ toko
        // console.log(role)
        if( role !== 'toko' && role !== 'vendor'){
            const err = new Error('Hanya bisa role toko/vendor')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const data = await db.collection('users').where('role', '==', role).get()
        if(data.empty){
            res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Data TIdak Ditemukan',
                data: []
            })
        }

        let allData = []
        data.forEach(doc => {
            dataRole = doc.data()

            //*! format createdAt (kapan bergabung agar bisa di baca)
            const date = new Date(dataRole.createdAt._seconds * 1000); // Konversi detik ke milidetik
            const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            const formattedDate = dateFormatter.format(date);

            const data = {
                id: doc.id,
                name: dataRole.name,
                email: dataRole.email,
                telepon: dataRole.telepon,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + dataRole.telepon,
                deskripsi: dataRole.deskripsi,
                alamat: dataRole.alamat ,
                bergabung: formattedDate,
                jam_operasional: dataRole.jam_operasional
            }
            allData.push(data)
        })


        // *? configure pagination
        const totalData = allData.length
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.size) || 3
        const startData = ((currentPage - 1) * perPage)
        // *! ubah array agar sesuai page
        allData = allData.slice(startData, startData + perPage)


        res.status(statusCode['200_ok']).json({
            errors: false,
            totalData: totalData,
            data : allData
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *? -- note -> doc di toko_vendor
// * endpoint dapatkan info user toko/ vendor -> misal diklik akan masuk ke info detail dimana hanya akan menerima param toko/ vendor
exports.detailInfo = async (req, res, next) => {
    try {
        //const user = await User.findById(req.params.id)
        const user = (await db.collection('users').doc(req.params.id).get()).data()
        //console.log(user)
        if(!user || user.role !== req.params.role || user.role === 'user'){
            const err = new Error('Error get data user!')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        //*! format createdAt (kapan bergabung agar bisa di baca)
        const date = new Date(user.createdAt._seconds * 1000); // Konversi detik ke milidetik
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = dateFormatter.format(date);

        const infoData = {
            id: req.params.id,
            name : user.name,
            alamat: user.alamat,
            telepon: user.telepon,
            deskripsi: user.deskripsi,
            jam_operasional: user.jam_operasional,
            wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
            bergabung: formattedDate,
            gambar_profil : user.gambar_profil
        }

        if(user.role === 'toko'){
            //*! BERISI TAMBAHAN INFO DATA UNTUK LIST BUAH
            infoData.buah = []

            const allData = await db.collection('buah').where('creator', '==', req.params.id).get()
            if(allData.empty){
                res.status(statusCode['200_ok']).json({
                    errors: false,
                    message: 'data buah kosong',
                    data: infoData
                })
            }

            allData.forEach(doc => {
                const buahData = doc.data()
                const dataBuah = {
                    id: doc.id,
                    name: buahData.name,
                    harga: parseInt(buahData.harga),
                    satuan: buahData.satuan
                }
                infoData.buah.push(dataBuah)
            })

           // console.log(infoData.buah)

            // *? configure pagination
            const totalData = allData.length
            const currentPage = parseInt(req.query.page) || 1
            const perPage = parseInt(req.query.size) || 3
            const startData = ((currentPage - 1) * perPage)
            // *! ubah array agar sesuai page
            infoData.buah = infoData.buah.slice(startData, startData + perPage)

        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            data : infoData
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *? -- note -> doc di toko_vendor
// * endpoint dapatkan info detail buah dari sebuah toko -> misal user akses data detail toko kemudian klik untuk info detail buah maka dapat endpoint ini diharapkan
exports.detailBuah = async (req, res, next) => {
    try{

        const idToko = req.params.idToko
        const idBuah = req.params.idBuah

        const user = (await db.collection('users').doc(idToko).get()).data()
        if(!user || user.role !== 'toko' ) {
            const err = new Error('user not authorized as')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const buah = (await db.collection('buah').doc(idBuah).get()).data()
        if(!buah || buah.creator !== idToko) {
            const err = new Error('user not authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        buah.harga = parseInt(buah.harga)

        //*! format createdAt (kapan bergabung agar bisa di baca)
        const date = new Date(user.createdAt._seconds * 1000); // Konversi detik ke milidetik
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = dateFormatter.format(date);

        res.status(statusCode['200_ok']).json({
            errors: false,
            toko: {
                name: user.name,
                telepon: user.telepon,
                alamat: user.alamat,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
                deskripsi: user.deskripsi,
                jam_operasional: user.jam_operasional,
                bergabung: formattedDate,
                gambar_profil: user.gambar_profil,
            } ,
            buah : {
                idBuah: idBuah,
                ...buah
            }
        })


    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getInfo = async (req, res, next) => {
    try {
        //const user = await User.findById(req.userId)
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user){
            const err = new Error('Get Info Failed')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        if(user.role !== 'user'){
            // * KETIKA ROLE BUKAN user MAKA AMBIL FOTO PROFIL TOKO/VENDOR jika ada
        }

        //*! format createdAt (kapan bergabung agar bisa di baca)
        const date = new Date(user.createdAt._seconds * 1000); // Konversi detik ke milidetik
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = dateFormatter.format(date);

        res.status(statusCode['200_ok']).json({
            errors : false,
            data : {
                id: req.userId,
                email: user.email,
                name: user.name,
                alamat: user.alamat,
                telepon: user.telepon,
                role: user.role,
                deskripsi : user.deskripsi,
                jam_operasional : user.jam_operasional,
                bergabung: formattedDate,
                gambar_profil: user.gambar_profil
            }
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.changeInfo = async (req, res, next) => {
    try{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Edit info gagal!')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user){
            const err = new Error('Edit info gagal, token tidak valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const newName = req.body.name
        const newNegara = req.body.negara
        const newKota = req.body.kota
        const newDeskripsiAlamat = req.body.deskripsi_alamat
        const newAlamat = {
            negara: newNegara,
            kota: newKota,
            deskripsi_alamat: newDeskripsiAlamat
        }
        let newTelp = req.body.telepon.toString()
        if(newTelp.startsWith('0')){
            newTelp = newTelp.slice(1)
        }

        user.name = newName
        user.alamat = newAlamat
        user.telepon = newTelp

        // * jika role bukan 'user' -> maka akan terima 2 data request body lagi
        if(user.role !== 'user') {
            const newDeskripsi = req.body.deskripsi
            const newJam = req.body.jam_operasional

            user.deskripsi = newDeskripsi
            user.jam_operasional = newJam

            // * PROSES EDIT/ADD GAMBAR
            if(req.file){
                req.editData = {
                    role : user.role,
                    userId: req.userId
                }
                const uploadPic = await fileController.uploadFile(req)

                if(uploadPic === false){
                    const err = new Error('Edit failed, upload pic error!')
                    err.statusCode = statusCode['400_bad_request']
                    throw err
                }

                user.gambar_profil = uploadPic
            }
            // else {
            //     console.log('gada file')
            // }
        }

        //*! update user Updated
        user.updatedAt = new Date()
        await db.collection('users').doc(req.userId).update(user)

        const new_data_response = {
            email: user.email,
            name: user.name,
            alamat: user.alamat,
            telepon: user.telepon,
            deskripsi: 'not authorized to change',
            jam_operasional: 'not authorized to change',
            gambar_profil: 'not authorized to change'
        }
        if(user.role !== 'user'){
            new_data_response.deskripsi = user.deskripsi
            new_data_response.jam_operasional = user.jam_operasional
            new_data_response.gambar_profil = user.gambar_profil
        }

        res.status(statusCode['200_ok']).json({
            errors : false,
            message: 'success edit data user',
            new_user_data : new_data_response
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}






exports.changePassword = async (req, res, next) => {
    function failed_change_pass(msg) {
        const err = new Error(msg)
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Failed Change Password')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const oldPassword = req.body.password_lama
        const newPassword = req.body.password_baru
        //const user = await User.findById(req.userId)
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if (!user) {
            failed_change_pass('Auth Error, Failed change password')
        }

        const oldPassEqual = await bcrypt.compare(oldPassword, user.password)
        if(!oldPassEqual) {
            failed_change_pass('Password lama tidak sesuai dengan akun anda! ganti password gagal!')
        }

        const passEqual = await bcrypt.compare(newPassword, user.password)
        if(passEqual){
            failed_change_pass('Password baru sama dengan password lama, proses ganti password gagal, silahkan gunakan password baru yang berbeda!')
        }

        const newPass = await bcrypt.hash(newPassword, 12)

        user.password = newPass
        //*! update user Updated
        user.updatedAt = new Date()
        await db.collection('users').doc(req.userId).update(user)

        res.status(statusCode['200_ok']).json({
            message: 'User success change password',
            user: {
                email: user.email,
                id: req.userId
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getForgetPasswordToken = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const err = new Error('Get Forget Token Failed!')
            err.statusCode = statusCode['406_unauthorized']
            err.data = errors.array()
            throw err
        }

        //const user = await User.findOne({ email : req.body.email })
        // * karena pakai email maka pencarian user juga pakai filter
        let data = await db.collection('users').where('email', '==', req.body.email).limit(1).get()
        let user
        let userId
        if(data.empty) {
            const err = new Error('Failed get token, User not found!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        } else {
            data = data.docs[0]
            user = data.data()
            userId = data.id
        }

        const token = crypto.randomBytes(12).toString('hex')
        const forgetPassToken = jwt.sign({
            userId : userId,
            email: user.email,
            token: token
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        } )

        await mailjet.post("send", {'version' : "v3.1"})
            .request({
                "Messages": [
                    {
                        "From" : {
                            "Email" : process.env.FROM_EMAIL,
                            "Name" : "Spotify Clone API"
                        },
                        "To" : [
                            {
                                "Email" : user.email,
                                "Name" : user.name
                            }
                        ],
                        "Subject" : "Forget Password Token",
                        "TextPart" : "",
                        "HTMLPart": `<p>Kode Lupa Password Anda </p> <br> <h3>Token : ${forgetPassToken}</h3> <br> <p>Silahkan tulis kode Anda dikolom yang disediakan</p> <p>Kode berlaku 15 Menit</p>`//,
                        //"CustomID": "AppGettingStartedTest"
                    }
                ]
            })

        user.token.forgetPass = token
        //*! update user Updated
        user.updatedAt = new Date()
        await db.collection('users').doc(userId).update(user)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success send token to email',
            token: forgetPassToken,
            user: {
                email: user.email,
                id: userId
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.changeForgetPassword = async (req, res, next) => {
    function failed_change_pass(msg) {
        const err = new Error(msg)
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const err = new Error('Failed Change Password')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const password = req.body.password
        // *! ubahan baru tidak pakai email saat input
        // const email = req.body.email
        const token = req.body.change_password_token

        const decoded_token = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded_token){
            failed_change_pass('Token tidak valid!')
        }

        //const user = await User.findById(decoded_token.userId)
        //* karena dibawah dibutuhkan email maka akan gunakan filter saat get user data agar dapat sekalian dapatkan id document
        let data = await db.collection('users').where('email', '==', decoded_token.email).limit(1).get()
        let user
        let userId
        if(data.empty) {
            failed_change_pass('Token tidak valid!')
        } else {
            data = data.docs[0]
            user = data.data()
            userId = data.id
        }

        // *! ubahan baru tidak pakai email saat input
        // if(user.email !== email){
        //     failed_change_pass('Email dimasukan tidak sesuai dengan data token!')
        // }


        if(userId !== decoded_token.userId || user.email !== decoded_token.email || user.token.forgetPass !== decoded_token.token ){
            failed_change_pass('Token tidak valid!')
        }

        const passEqual = await bcrypt.compare(password, user.password)
        if(passEqual) {
            failed_change_pass('Password baru sama dengan password lama, proses ganti password gagal!')
        }

        const newPassHash = await bcrypt.hash(password, 12)
        user.password = newPassHash
        user.token.forgetPass = null

        //*! update user Updated
        user.updatedAt = new Date()
        await db.collection('users').doc(userId).update(user)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success change password from forget password",
            user: {
                email: user.email,
                id: userId
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}
