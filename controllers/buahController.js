/**
 * ! catatan ----
 * ! ini untuk proses routing controller buah yang berhubungan dengan objek buah secara umum. bukan untuk perubahan buah misal CRUD buah (hal tsb dilakukan di routing /toko/ )
 * !-------
 */

const statusCode = require('../util/response').httpStatus_keyValue


// * firestore
const db = require('../database/db')


//* -------------------------- controller -------------------------- *//

exports.getAllBuah = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user) {
            const err = new Error('User Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* searching query
        let q
        if(req.query.search){
            //* gunakan if disini untuk pastikan bahawa query diisi, karena jika tidak diisi "undefined"
            //* maka tidak bisa lakukan .trim()
            q = (req.query.search).toString().trim().toLowerCase()
        }

        const allBuah = (await db.collection('buah').get())
        let dataBuah = []
        allBuah.forEach(doc => {
            const buahData = doc.data()
            //*! bantuan sementara untuk STOK
            if(!buahData.stok) {
                buahData.stok = 0
            }
            const buah = {
                idBuah: doc.id,
                name: buahData.name,
                harga: buahData.harga,
                //* tambah properti stok
                stok: buahData.stok,
                gambar: buahData.gambar,
                creator: buahData.creator
            }

            if(q){
                if(buah.name.toLowerCase().includes(q)){
                    dataBuah.push(buah)
                }
            } else {
                dataBuah.push(buah)
            }

        })


        if(q){

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Search Get Buah Data',
                totalData: dataBuah.length,
                data: dataBuah
            })

        }

        // *! pagination configuration
        const totalData = dataBuah.length
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.size) || 3
        const startData = ((currentPage - 1) * perPage)
        //*! change array
        dataBuah = dataBuah.slice(startData, startData + perPage)


        res.status(statusCode['200_ok']).json({
            error: false,
            message: "Get Buah Data",
            totalData: totalData,
            data: dataBuah
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}