require('dotenv').config()
const Buah = require('../models/buah')
const statusCode = require('../util/response').httpStatus_keyValue
const { validationResult } = require('express-validator')

// * firestore
const db = require('../database/db')
const {all} = require("express/lib/application");

// * saran struktur buah
// struktur_buah = {
//     id,
//     name,
//     harga,
//     deskripsi,
//     gambar,
//     satuan
// }


//* -------------------------- controller -------------------------- *//

exports.detailBuah = async (req, res, next) => {
    try {
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'toko'){
            const err = new Error('not Authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const buah = (await db.collection('buah').doc(req.params.idBuah).get()).data()
        if(!buah || buah.creator !== req.userId){
            const err = new Error('not Authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            toko: {
                name: user.name,
                email: user.email,
                telepon: user.telepon,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
                alamat: user.alamat,
                deskripsi: user.deskripsi,
                jam_operasional: user.jam_operasional
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
            const err = new Error('not Authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* get all buah data
        const allBuah = await db.collection('buah').where('creator', '==', req.userId).get()
        let dataBuah = []
        allBuah.forEach(doc => {
            const buahdata = {buahId : doc.id, ...doc.data()}
            dataBuah.push(buahdata)
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            toko: {
                name: user.name,
                email: user.email,
                telepon: user.telepon,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + user.telepon,
                alamat: user.alamat,
                deskripsi: user.deskripsi,
                jam_operasional: user.jam_operasional
            },
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
        //console.log(user)
        if(!user || user.role !== 'toko'){
            const err = new Error('Not authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const name = req.body.name
        const harga = req.body.harga
        const satuan = req.body.satuan
        const deskripsi = req.body.deskripsi
        const gambar = req.body.gambar

        const creator = req.userId

        const buah = new Buah(name, harga, satuan, gambar, deskripsi, creator)

        const newBuah = {...buah}
        const addBuah = await db.collection('buah').add(newBuah)
        const idBuah = addBuah.id
        console.log(idBuah)

        // * tambah ID ke Array user
        user.buah.push(idBuah)
        await db.collection('users').doc(req.userId).update({
            buah: user.buah
        })

        res.status(statusCode['201_created']).json({
            errors: false,
            message: 'success create new buah',
            data: {
                creator: {
                    id: req.userId,
                    toko: user.name
                },
                name: newBuah.name,
                harga: newBuah.harga,
                satuan: newBuah.satuan,
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
        //console.log(user)
        if(!user || user.role !== 'toko'){
            const err = new Error('Not authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const buahEdit = (await db.collection('buah').doc(req.body.buahId).get()).data()
        if(!buahEdit || buahEdit.creator.toString() !== req.userId){
            const err = new Error('Not authorized user')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const newName = req.body.name
        const newHarga = req.body.harga
        const newSatuan = req.body.satuan
        const newDeskripsi = req.body.deskripsi
        const newGambar = req.body.gambar

        buahEdit.name = newName
        buahEdit.harga = newHarga
        buahEdit.satuan = newSatuan
        buahEdit.deskripsi = newDeskripsi
        buahEdit.gambar = newGambar


        await db.collection('buah').doc(req.body.buahId).update(buahEdit)

        res.status(statusCode['200_ok']).json({
            errors: false,
            new_buah_data : {
                creator: {
                    userId: req.userId,
                    toko: user.name
                },
                name : buahEdit.name,
                harga: buahEdit.harga,
                satuan: buahEdit.satuan,
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
            const err = new Error('Not authorized user')
            err.statusCode = statusCode['401']
            throw err
        }

        //const buahHapus = await Buah.findById(req.body.buahId)
        const buahHapus = (await db.collection('buah').doc(req.body.buahId).get()).data()
        if(!buahHapus || buahHapus.creator.toString() !== req.userId){
            const err = new Error('Not authorized user')
            err.statusCode = statusCode['401']
            throw err
        }

        await db.collection('buah').doc(req.body.buahId).delete()

        const deletedBuahId = user.buah.filter((value) => value !== req.body.buahId);
        await db.collection('users').doc(req.userId).update({
            buah: deletedBuahId
        })

        res.status(statusCode['200_ok']).json({
            errors : false,
            message: 'success delete buah data',
            data: buahHapus
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}