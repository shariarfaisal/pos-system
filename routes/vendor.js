const router = require('express').Router()
const { vendors, vendor, createVendor, updateVendor, deleteVendor } = require('../controllers/vendor')
const idChecker = require('../middleware/idChecker')

router.get('/',vendors)
router.get('/:id',idChecker,vendor)
router.post('/',createVendor)
router.put('/:id',idChecker,updateVendor)
router.delete('/:id',idChecker,deleteVendor)

module.exports = router
