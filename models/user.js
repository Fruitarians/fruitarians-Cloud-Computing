//*! catatan struktur di bawah
// *? properti lain akan ditambahkan saat proses signup tergantung role
/**
 * deskripsi
 * jam_operasional
 * createdAt
 * buah : [] -> khusus toko
 */


class userSchema {
    constructor(email, password, name, role, alamat, telepon){
        this.email = email
        this.password = password
        this.name = name
        this.role = role
        this.alamat = alamat
        this.telepon = telepon
        this.gambar_profil = null
        this.createdAt = new Date()
        this.updatedAt = null
        this.token = {
            auth: null,
            forgetPass: null
        }
    }
}

module.exports = userSchema




