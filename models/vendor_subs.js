class vendorSubs {
    constructor(name, owner, telepon, category, schedule, deskripsi, creator){
        this.name = name
        this.owner = owner
        this.telepon = telepon
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