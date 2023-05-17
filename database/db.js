const key_db = require('../firebase_key.json')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(key_db)
})

const db = admin.firestore()

module.exports = db