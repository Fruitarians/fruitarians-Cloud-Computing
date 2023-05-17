class userSchema {
    constructor(email, password, name, role, alamat, telepon){
        this.email = email
        this.password = password
        this.name = name
        this.role = role
        this.alamat = alamat
        this.telepon = telepon
        this.token = {
            auth: null,
            forgetPass: null
        }
    }
}

module.exports = userSchema


//*? catatan struktur di atas
// *? properti lain akan ditambahkan saat proses signup tergantung role
/**
 * deskripsi
 * jam_operasional
 * createdAt
 * buah : [] -> khusus toko
 */


// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const userSchema = new Schema({
//     email : {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true
//     },
//     createdAt : {
//         type: String,
//         required: true
//     },
//     alamat : {
//         type: String
//     },
//     telepon : {
//         type: Number
//     },
//     deskripsi : {
//         type : String,
//         default: null
//     },
//     jam_operasional : {
//         type : String,
//         default: null
//     },
//     buah: [{
//         type: Schema.Types.ObjectId,
//         ref: "Buah"
//     }],
//     token: {
//         auth: {
//             type: String,
//             default: null
//         },
//         forgetPass: {
//             type: String,
//             default: null
//         }
//     }
// })

//module.exports = mongoose.model("User", userSchema)


