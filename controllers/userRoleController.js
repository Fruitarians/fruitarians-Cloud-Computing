/**
 * ! catatan ------------
 * ! berisi controller untuk hal EXTRA yang hanya bisa dilakukan role user
 * ! -------------------
 */

const statusCode = require('../util/response').httpStatus_keyValue

// * firestore
const admin = require('firebase-admin')
const db = require('../database/db')


//* -------------------------- controller -------------------------- *//

exports.getAllBookmark = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        let dataBookmark = []
        let totalData = 0
        if(user.bookmark){
            const data = (await db.collection('users').where(admin.firestore.FieldPath.documentId(), 'in', user.bookmark).get())

            data.forEach(doc => {
                const dataUser = doc.data()
                const dataPush = {
                    id: doc.id,
                    name: dataUser.name,
                    alamat: dataUser.alamat ,
                    deskripsi: dataUser.deskripsi,
                    gambar_profil: dataUser.gambar_profil,
                    wa_link: 'https://api.whatsapp.com/send?phone=62' + dataUser.telepon
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





exports.postBookmark = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* butuh input id toko terkait
        const id = req.body.bookmark_userId
        const userBookmarked = (await db.collection('users').doc(id).get()).data()
        // *! verif filter bahwa misal yang BISA DIMASUKAN bookmark HANYA user ROLE TOKO SAJA
        if(!userBookmarked || userBookmarked.role !== 'toko'){
            const err = new Error('User ingin dibookmark tidak valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //*! general response config
        general_response = {
            errors: false,
            message: 'data sudah ada di bookmark',
            bookmarked_user_id: id
        }

        if(!user.bookmark.includes(id)){
            user.bookmark.push(id)
            await db.collection('users').doc(req.userId).update({
                bookmark: user.bookmark
            })

            general_response.message = 'success add id to bookmark'
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
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id = req.body.delete_bookmark_userId //*! id bookmark yang ingin dihapus

        //*? response message
        let message = 'id bookmark not found on user data'

        if(user.bookmark.includes(id)){
            const deletedArrayBookmark = user.bookmark.filter(value => value !== id)

            await db.collection('users').doc(req.userId).update({
                bookmark: deletedArrayBookmark
            })
            message = 'success delete the bookmarked id'
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




