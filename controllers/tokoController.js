require('dotenv').config()
const Buah = require('../models/buah')
const statusCode = require('../util/response').httpStatus_keyValue
const { validationResult } = require('express-validator')

// * firestore
const db = require('../database/db')

// * file controller for upload pic
const fileController = require('./fileController')


//* -------------------------- controller -------------------------- *//
exports.detailBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'toko'){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const buah = (await db.collection('buah').doc(req.params.idBuah).get()).data()
        if(!buah || buah.creator !== req.userId){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        buah.harga = parseInt(buah.harga)
        //* tambah stok properti
        buah.stok = parseInt(buah.stok)


        //*! format createdAt (kapan bergabung agar bisa di baca)
        const date = new Date(user.createdAt._seconds * 1000); // Konversi detik ke milidetik
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = dateFormatter.format(date);

        res.status(statusCode['200_ok']).json({
            errors: false,
            toko: {
                name: user.name,
                email: user.email,
                telepon: user.telepon,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
                alamat: user.alamat,
                deskripsi: user.deskripsi,
                jam_operasional: user.jam_operasional,
                bergabung: formattedDate,
                gambar_profil: user.gambar_profil
            },
            buah: buah
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// * all buah maksudnya ada detail dari seluruh data buah DARI satu TOKO sesuai dengan ROLE TOKO USER YANG LOGIN
exports.getAllBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'toko' ) {
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* get all buah data
        const allBuah = await db.collection('buah').where('creator', '==', req.userId).get()
        let dataBuah = []
        allBuah.forEach(doc => {
            const buahdata = {buahId : doc.id, ...doc.data()}
            buahdata.harga = parseInt(buahdata.harga)
            buahdata.stok = parseInt(buahdata.stok)
            dataBuah.push(buahdata)
        })


        // *? configure pagination
        const totalData = dataBuah.length
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.size) || 3
        const startData = ((currentPage - 1) * perPage)
        // *! ubah array agar sesuai page
        dataBuah = dataBuah.slice(startData, startData + perPage)


        //*! format createdAt (kapan bergabung agar bisa di baca)
        const date = new Date(user.createdAt._seconds * 1000); // Konversi detik ke milidetik
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDate = dateFormatter.format(date);

        res.status(statusCode['200_ok']).json({
            errors: false,
            toko: {
                id: req.userId,
                name: user.name,
                email: user.email,
                telepon: user.telepon,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
                alamat: user.alamat,
                deskripsi: user.deskripsi,
                jam_operasional: user.jam_operasional,
                bergabung: formattedDate,
                gambar_profil: user.gambar_profil
            },
            totalBuah: totalData ,
            buah: dataBuah
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}







exports.createBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()

        if(!user || user.role !== 'toko'){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const name = req.body.name
        const harga = parseInt(req.body.harga)
        const satuan = req.body.satuan
        const deskripsi = req.body.deskripsi
        const creator = req.userId
        //*! tambah stok properti
        const stok = parseInt(req.body.stok)

        const buah = new Buah(name, harga, satuan, deskripsi, creator, stok)

        const newBuah = {...buah}
        const addBuah = await db.collection('buah').add(newBuah)
        const idBuah = addBuah.id
        //console.log(idBuah)

        const general_response = {
            errors: false,
            message: 'Success Create New Buah',
            picture: {
                with_picture: false,
                success_upload: false
            }
        }

        // *? proses jika input gambar
        if(req.file){
            general_response.picture.with_picture = true
            req.editData = {
                role: 'toko',
                userId: req.userId,
                idBuah: idBuah
            }

            const uploadPic = await fileController.uploadFile(req)

            if(uploadPic !== false){
                //const err = new Error('')
                newBuah.gambar = uploadPic
                await db.collection('buah').doc(idBuah).update({
                    gambar: uploadPic
                })
                general_response.picture.success_upload = true
            }
        }

        // * tambah IDBuah ke Array user untuk data buah
        user.buah.push(idBuah)
        //*! update user UpdatedAt -> menambahkan buah
        user.updatedAt = new Date()
        await db.collection('users').doc(req.userId).update({
            buah: user.buah
        })

        res.status(statusCode['201_created']).json({
            ...general_response,
            data: {
                creator: {
                    id: req.userId,
                    toko: user.name
                },
                name: newBuah.name,
                harga: newBuah.harga,
                satuan: newBuah.satuan,
                stok: newBuah.stok,
                deskripsi: newBuah.deskripsi,
                gambar: newBuah.gambar
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.editBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()

        if(!user || user.role !== 'toko'){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const buahEdit = (await db.collection('buah').doc(req.body.buahId).get()).data()
        if(!buahEdit || buahEdit.creator.toString() !== req.userId){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const newName = req.body.name
        const newHarga = req.body.harga
        const newSatuan = req.body.satuan
        const newDeskripsi = req.body.deskripsi
        //const newGambar = req.body.gambar
        //* tambah stok properti
        const newStok = req.body.stok

        buahEdit.name = newName
        buahEdit.harga = parseInt(newHarga)
        buahEdit.satuan = newSatuan
        buahEdit.deskripsi = newDeskripsi
        //* tambah stok properti
        buahEdit.stok = parseInt(newStok)

        const general_response = {
            errors: false,
            picture: {
                new_picture: false,
                success_upload: false
            }
        }

        if(req.file){
            general_response.picture.new_picture = true
            req.editData = {
                role: 'toko',
                userId: req.userId,
                idBuah: req.body.buahId
            }

            const editPic = await fileController.uploadFile(req)

            if(editPic !== false){
                buahEdit.gambar = editPic
                general_response.picture.success_upload = true
            }

        }

        buahEdit.updatedAt = new Date()
        await db.collection('buah').doc(req.body.buahId).update(buahEdit)

        res.status(statusCode['200_ok']).json({
            ...general_response,
            new_buah_data : {
                creator: {
                    userId: req.userId,
                    toko: user.name
                },
                name : buahEdit.name,
                harga: buahEdit.harga,
                satuan: buahEdit.satuan,
                stok: buahEdit.stok,
                deskripsi: buahEdit.deskripsi,
                gambar: buahEdit.gambar
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'toko'){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401']
            throw err
        }


        const buahHapus = (await db.collection('buah').doc(req.body.buahId).get()).data()
        if(!buahHapus || buahHapus.creator.toString() !== req.userId){
            const err = new Error('Not Authorized User')
            err.statusCode = statusCode['401']
            throw err
        }

        await db.collection('buah').doc(req.body.buahId).delete()

        const general_response = {
            errors: false,
            message: 'Success Delete Buah Data',
            picture: {
                has_picture: false,
                success_delete_picture: false
            }
        }

        // *! hapus gambar buah terkait jika punya nilai != null
        if(buahHapus.gambar){
            general_response.picture.has_picture = true
            req.editData = {
                role: 'toko',
                userId: req.userId,
                idBuah: req.body.buahId
            }

            const hapusGambar = await fileController.deleteItem(req)
            if(hapusGambar) {
                general_response.picture.success_delete_picture = true
            }
        }

        const deletedBuahId = user.buah.filter((value) => value !== req.body.buahId);
        //*! update user UpdatedaT -> menambahkan buah
        user.updatedAt = new Date()
        await db.collection('users').doc(req.userId).update({
            buah: deletedBuahId
        })

        res.status(statusCode['200_ok']).json({
            ...general_response,
            data: buahHapus
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}