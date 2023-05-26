class buahSchema {
    constructor(name, harga, satuan, deskripsi, creator, stok) {
        this.name = name
        this.harga = harga
        this.satuan = satuan
        this.stok = stok
        this.gambar = null
        this.deskripsi = deskripsi
        this.creator = creator
        this.createdAt = new Date()
        this.updatedAt = null
    }
}

module.exports = buahSchema