class buahSchema {
    constructor(name, harga, satuan, gambar, deskripsi, creator) {
        this.name = name
        this.harga = harga
        this.satuan = satuan
        this.gambar = gambar
        this.deskripsi = deskripsi
        this.creator = creator
    }
}

module.exports = buahSchema

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
// const buahSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     harga: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     satuan: {
//         type: String,
//         required: true,
//     },
//     deskripsi: {
//         type: String,
//         required: true
//     },
//     gambar: {
//         type: String,
//         default: null
//     },
//     creator: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     }
// })
//
//
// module.exports = mongoose.model('Buah', buahSchema)