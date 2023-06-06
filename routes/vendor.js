const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const vendorController = require('../controllers/vendorController')

// * ------------------------------- route ------------------------------- * //


router.get('/', isAuth, vendorController.getVendorSubs)

router.get('/:id_subs', isAuth, vendorController.getVendorSubs)

router.post('/', isAuth, vendorController.createVendorSubs)

router.patch('/:id_subs/:delivered', isAuth, vendorController.editvendorSubs) //* ubah status delivered saja -> nilai default(harus) :delivered -> "delivered"

router.patch('/:id_subs', isAuth, vendorController.editvendorSubs)

router.delete('/:id_subs', isAuth, vendorController.deleteVendorSubs)


module.exports = router