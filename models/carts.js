class cartSchema {
    constructor(id_toko, id_user){
        this.id_toko = id_toko
        this.id_user = id_user
        this.buah = []
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }
}


module.exports = cartSchema