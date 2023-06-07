const statusCode = require('../util/response').httpStatus_keyValue
const VendorSubs = require('../models/vendor_subs')

// * firestore
const db = require('../database/db')


//* -------------------------- controller -------------------------- *//

exports.getVendorSubs = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'vendor'){
            throw_err('User Not Authorized', statusCode['401_unauthorized'])
        }

        //* ------------------ Cek jika pake params ID -> maka cari 1 data terkait saja ------------------
        let vendor_subs
        if(req.params.id_subs){
            //* HANYA BALIKAN 1 DATA DETAIL TERKAIT
            const vendor_detail = (await db.collection('vendor_subs').doc(req.params.id_subs).get()).data()
            if(!vendor_detail){
                throw_err('ID Data Subs Vendor not Found', statusCode['404_not_found'])
            }
            if(vendor_detail.creator !== req.userId){
                throw_err('User Not Authorized', statusCode['401_unauthorized'])
            }

            const data = vendor_detail

            //*! format createdAt (kapan bergabung agar bisa di baca)
            const date = new Date(data.createdAt._seconds * 1000); // Konversi detik ke milidetik
            const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            const formattedDate = dateFormatter.format(date);

            const vendor_data = {
                id: req.params.id_subs,
                name: data.name,
                owner: data.owner,
                category: data.category,
                telepon: data.telepon,
                alamat: data.alamat,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + data.telepon,
                schedule: data.schedule,
                deskripsi: data.deskripsi,
                delivered: data.delivered,
                bergabung: formattedDate
            }

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Get One Detail Vendor Subs',
                data: vendor_data
            })
        }
        // * ------------------ ------------------ ------------------ ------------------ ------------------
        else {
            vendor_subs = await db.collection('vendor_subs')
                .where('creator', '==', req.userId).get()
        }

        //* SEARCH -> jika gunakan query search -> berdasarkan "nama"
        let q
        if(req.query.search){
            //* gunakan if disini untuk pastikan bahawa query diisi, karena jika tidak diisi "undefined"
            //* maka tidak bisa lakukan .trim()
            q = (req.query.search).toString().trim().toLowerCase()
        }

        let user_vendor_subs = []
        vendor_subs.forEach(doc => {
            const data = doc.data()

            //*! format createdAt (kapan bergabung agar bisa di baca)
            const date = new Date(data.createdAt._seconds * 1000); // Konversi detik ke milidetik
            const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
            const formattedDate = dateFormatter.format(date);

            const vendor_data = {
                id: doc.id,
                name: data.name,
                owner: data.owner,
                category: data.category,
                telepon: data.telepon,
                alamat: data.alamat,
                wa_link: 'https://api.whatsapp.com/send?phone=62' + data.telepon,
                schedule: data.schedule,
                deskripsi: data.deskripsi,
                delivered: data.delivered,
                bergabung: formattedDate
            }

            if(q){
                if(data.name.toLowerCase().includes(q)){
                    user_vendor_subs.push(vendor_data)
                }
            } else{
                user_vendor_subs.push(vendor_data)
            }
        })

        //*? PAGINATION CONFIGURATION
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startData = (page - 1) * size
        const total_data = user_vendor_subs.length

        user_vendor_subs = user_vendor_subs.slice(startData, startData + size)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Vendor Subs Data',
            data: {
                total_data: total_data,
                current_page: page,
                per_page: size,
                vendor_subs: user_vendor_subs
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.createVendorSubs = async (req, res, next) => {
    try{
        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'vendor'){
            const err = new Error('User Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //* data new subs
        const name = req.body.name
        const owner = req.body.owner
        let telepon = req.body.telepon
        if(telepon.startsWith("0")){
            telepon = telepon.slice(1)
        }
        const alamat = req.body.alamat
        const category = req.body.category
        const schedule = req.body.schedule
        const deskripsi = req.body.deskripsi
        const creator = req.userId
        // * new obj subs vendor
        const new_subs = new VendorSubs(
            name, owner, telepon, alamat, category, schedule, deskripsi, creator
        )
        const newSubs = {...new_subs}

        await db.collection('vendor_subs').add(newSubs)

        res.status(statusCode['201_created']).json({
            errors: false,
            message: 'Success Create New Subs Vendor Data'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editvendorSubs = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'vendor'){
            throw_err('User Not Authorized', statusCode['401_unauthorized'])
        }

        const subs_edit = (await db.collection('vendor_subs').doc(req.params.id_subs).get()).data()
        if(!subs_edit){
            throw_err('ID Data Subs Vendor not Found', statusCode['404_not_found'])
        }
        if(subs_edit.creator !== req.userId){
            throw_err('User Not Authorized', statusCode['401_unauthorized'])
        }


        //* ------------ JIKA PROSES UBAH HANYA UBAH status delivered SAJA ------------
        if(req.params.delivered === 'delivered'){
            if(subs_edit.delivered === true){
                subs_edit.delivered = false
            } else{
                subs_edit.delivered = true
            }

            await db.collection('vendor_subs').doc(req.params.id_subs).update(subs_edit)

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Success Change Delivered Status'
            })
        }
        //* ------------------------------- ------------------------------- -------------------------------


        //* edit data
        subs_edit.name = req.body.name
        subs_edit.owner = req.body.owner
        subs_edit.telepon = req.body.telepon
        subs_edit.alamat = req.body.alamat
        subs_edit.category = req.body.category
        subs_edit.schedule = req.body.schedule
        subs_edit.deskripsi = req.body.deskripsi
        subs_edit.updatedAt = new Date()

        await db.collection('vendor_subs').doc(req.params.id_subs).update(subs_edit)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Edit Data Subs Vendor'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteVendorSubs = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = (await db.collection('users').doc(req.userId).get()).data()
        if(!user || user.role !== 'vendor'){
            throw_err('User Not Authorized', statusCode['401_unauthorized'])
        }

        const deleted_subs = (await db.collection('vendor_subs').doc(req.params.id_subs).get()).data()
        if(!deleted_subs){
            throw_err('ID Data Subs Vendor not Found', statusCode['404_not_found'])
        }
        if(deleted_subs.creator !== req.userId){
            throw_err('User Not Authorized', statusCode['401_unauthorized'])
        }

        await db.collection('vendor_subs').doc(req.params.id_subs).delete()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Delete Subs Vendor Data'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}