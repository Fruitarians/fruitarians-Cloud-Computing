class buahSchema {
    constructor(name, harga, satuan, deskripsi, creator) {
        this.name = name
        this.harga = harga
        this.satuan = satuan
        this.gambar = null
        this.deskripsi = deskripsi
        this.creator = creator
    }
}

module.exports = buahSchema