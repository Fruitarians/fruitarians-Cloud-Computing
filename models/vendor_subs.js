class vendorSubs {
    constructor(name, owner, telepon, alamat, category, schedule, deskripsi, creator){
        this.name = name
        this.owner = owner
        this.telepon = telepon
        this.alamat = alamat
        this.category = category
        this.schedule = schedule
        this.deskripsi = deskripsi
        this.creator = creator
        this.delivered = false
        this.createdAt = new Date()
        this.updatedAt = this.createdAt
    }
}

module.exports = vendorSubs