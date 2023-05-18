class userSchema {
    constructor(email, password, name, role, alamat, city, state, telepon){
        this.email = email
        this.password = password
        this.name = name
        this.role = role
        this.alamat = alamat
        this.city = city
        this.state = state
        this.telepon = telepon
        this.gambar_profil = null
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


