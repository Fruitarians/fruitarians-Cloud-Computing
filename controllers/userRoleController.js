/**
 * ! catatan ------------
 * * berisi controller untuk hal EXTRA yang hanya bisa dilakukan role user
 *  * routing tetap ada di "user.js"
 * ! -------------------
 */

const statusCode = require('../util/response').httpStatus_keyValue

// * firestore
const admin = require('firebase-admin')
const db = require('../database/db')
const {check} = require("express-validator");


//* -------------------------- controller -------------------------- *//

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




