/**
 * ! catatan ------------
 * * berisi controller untuk hal EXTRA yang hanya bisa dilakukan role user
 *  * routing tetap ada di "user.js"
 * ! -------------------
 */

const statusCode = require('../util/response').httpStatus_keyValue

const Cart = require('../models/carts')

// * firestore
const admin = require('firebase-admin')
const db = require('../database/db')
const {check} = require("express-validator");


//* -------------------------- controller -------------------------- *//

// *! ------------------------------------ BOOKMARK ------------------------------------

exports.getAllBookmark = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized Access')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        let dataBookmark = []
        let totalData = 0
        if(user.bookmark.length >= 1){
            const data = (await db.collection('users').where(admin.firestore.FieldPath.documentId(), 'in', user.bookmark).get())

            data.forEach(doc => {
                const dataUser = doc.data()

                //*! format createdAt (kapan bergabung agar bisa di baca)
                const date = new Date(dataUser.createdAt._seconds * 1000);
                const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                const formattedDate = dateFormatter.format(date);

                const dataPush = {
                    id: doc.id,
                    name: dataUser.name,
                    email: dataUser.email,
                    telepon: dataUser.telepon,
                    alamat: dataUser.alamat ,
                    deskripsi: dataUser.deskripsi,
                    gambar_profil: dataUser.gambar_profil,
                    wa_link: 'https://api.whatsapp.com/send?phone=62' + dataUser.telepon,
                    bergabung: formattedDate,
                    jam_operasional: dataUser.jam_operasional
                }
                dataBookmark.push(dataPush)
            })

            //*! Pagination Configure
            totalData = dataBookmark.length
            const page = parseInt(req.query.page) || 1
            const perPage = parseInt(req.query.size) || 3
            const startData = ((page - 1) * perPage)
            //*! array pagination
            dataBookmark = dataBookmark.slice(startData, startData + perPage)

        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get user bookmark data',
            totalData: totalData,
            data: dataBookmark
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getFollowingInfo = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized Access')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const check_bookmark = req.params.bookmark_userId
        let bookmarked = false
        if(user.bookmark.includes(check_bookmark)){
            bookmarked = true
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Bookmarked Data User Info',
            data: {
                bookmarked_userId: check_bookmark,
                bookmarked: bookmarked
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['400_bad_request']
        }
        next(e)
    }
}





exports.postBookmark = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized Access')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* butuh input id toko terkait
        const id = req.body.bookmark_userId
        const userBookmarked = (await db.collection('users').doc(id).get()).data()
        // *! verif filter bahwa misal yang BISA DIMASUKAN bookmark HANYA user ROLE TOKO SAJA
        if(!userBookmarked || userBookmarked.role !== 'toko'){
            const err = new Error('Not Authorized Access')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //*! general response config
        general_response = {
            errors: false,
            message: 'The Data is Already Bookmarked.',
            bookmarked_user_id: id
        }

        if(!user.bookmark.includes(id)){
            user.bookmark.push(id)
            await db.collection('users').doc(req.userId).update({
                bookmark: user.bookmark
            })

            general_response.message = 'Success Add Data to Bookmark'
        }

        res.status(statusCode['200_ok']).json({
            ...general_response
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteBookmark = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized Access')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id = req.params.bookmark_userId //*! id bookmark yang ingin dihapus

        //*? response message
        let message = 'Data Bookmark Not Found On User Data'

        if(user.bookmark.includes(id)){
            const deletedArrayBookmark = user.bookmark.filter(value => value !== id)

            await db.collection('users').doc(req.userId).update({
                bookmark: deletedArrayBookmark
            })
            message = 'Success Delete the Bookmarked Data'
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: message
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *! ------------------------------------ BOOKMARK ------------------------------------

exports.getCarts = async (req, res, next) => {
    try {
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            throw_err('Not Authorized User', statusCode['401_unauthorized'])
        }

        //* get data
        const all_carts = await db.collection('carts').where('id_user', '==', req.userId).get()
        const carts = []
        all_carts.forEach(doc => carts.push({id: doc.id , ...doc.data()}))
        let data_carts = []
        for(const data of carts){
            if(data.buah.length > 0){
                //* ketika pada data terdaoat buah di array maka baru ditampilkan

                //* strukturkan data toko
                const toko = (await db.collection('users').doc(data.id_toko).get()).data()
                const toko_data = {
                    id: data.id_toko,
                    name: toko.name,
                    deskripsi: toko.deskripsi,
                    gambar_profil: toko.gambar_profil,
                    jam_operasional: toko.jam_operasional,
                    alamat: toko.alamat,
                    telepon: toko.telepon
                }

                let array_buah = []
                const all_buah = await db.collection('buah').where(admin.firestore.FieldPath.documentId(), 'in', data.buah).get()
                all_buah.docs.forEach(doc => {
                    const buah = doc.data()
                    const data = {
                        id_buah: doc.id,
                        name: buah.name,
                        harga: buah.harga,
                        satuan: buah.satuan,
                        deskripsi: buah.deskripsi,
                        gambar: buah.gambar
                    }
                    array_buah.push(data)
                })

                const data_cart = {
                    id_cart: data.id,
                    toko: toko_data,
                    cart: array_buah
                }

                data_carts.push(data_cart)
            }
        }


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Get Cart Data',
            data: {
                total_data: data_carts.length,
                carts: data_carts
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postCart = async (req, res, next) => {
    try {
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            throw_err('Not Authorized User', statusCode['401_unauthorized'])
        }

        const id_buah = req.body.id_buah
        const id_toko = req.body.id_toko

        const user_cart = await db.collection('carts')
            .where("id_user", "==", req.userId)
            .where("id_toko", "==", id_toko)
            .limit(1)
            .get()

        //* basic response
        const response = {
            errors: false,
            message: 'Success Add Buah to Cart'
        }

        //* let toko var
        let toko_check

        //* karena memang didesign hanya bisa dapatkan 1 saja dan karena seperti di atas pasti balikan akan dalam array maka
        if(!user_cart.empty){
            //* cek apakah buah sama sudah dimasukan atau belum
            const cart = user_cart.docs[0].data()
            if(cart.buah.includes(id_buah)){
                response.message = 'Buah is Already in Cart'
                return res.status(statusCode['200_ok']).json(response)
            }

            //* ambil data toko namun karena sudah ada sebelumnya tidak perlu dicek karena pasti valid, data toko untuk pastikan buah adalah bagian dari toko terkait
            toko_check = (await db.collection('users').doc(id_toko).get()).data()
            if(!toko_check.buah.includes(id_buah)){
                throw_err('Buah Data not Found in Toko', statusCode['404_not_found'])
            }

            cart.buah.push(id_buah)
            await db.collection('carts').doc(user_cart.docs[0].id).update({
                buah: cart.buah
            })

            return res.status(statusCode['200_ok']).json(response)
        }

        //* jika belum pernah maka tambah data baru
        toko_check = (await db.collection('users').doc(id_toko).get()).data()
        if(!toko_check){
            throw_err('Toko Data not Found', statusCode['404_not_found'])
        }

        if(!toko_check.buah.includes(id_buah)){
            throw_err('Buah Data not Found in Toko', statusCode['404_not_found'])
        }

        const new_cart = new Cart(id_toko, req.userId)
        new_cart.buah.push(id_buah)

        const newCart = {...new_cart}
        await db.collection('carts').add(newCart)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success add Buah to Cart'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.deleteOneBuah = async (req, res, next) => {
    try {
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            throw_err('Not Authorized User', statusCode['401_unauthorized'])
        }

        const id_cart = req.params.id_cart
        const id_buah = req.params.id_buah

        const cart = (await db.collection('carts').doc(id_cart).get()).data()
        if(!cart || cart.id_user !== req.userId){
            throw_err('Cart Data not Found', statusCode['404_not_found'])
        }

        if(!cart.buah.includes(id_buah)){
            throw_err('Data Buah not Found', statusCode['404_not_found'])
        }

        const new_cart = cart.buah.filter(id => id !== id_buah )
        await db.collection('carts').doc(id_cart).update({
            buah: new_cart
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Delete Buah data From Cart'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteCarts = async (req, res, next) => {
    try {
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            throw_err('Not Authorized User', statusCode['401_unauthorized'])
        }

        const id_cart = req.params.id_cart
        const cart_check = (await db.collection('carts').doc(id_cart).get()).data()
        console.log(id_cart)
        console.log(cart_check)
        if(!cart_check || cart_check.id_user !== req.userId){
            throw_err('Cart Data not Found', statusCode['404_not_found'])
        }

        await db.collection('carts').doc(id_cart).delete()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Delete Cart Data'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}