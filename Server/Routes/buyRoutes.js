const router = require('express').Router();
const buyCtrl = require('../controllers/buyCtrl')

// Rental routes
router.post('/', buyCtrl.createBuyer);
router.get('/', buyCtrl.getAllBuyers);
router.get('/:id', buyCtrl.getBuyerById);
router.delete('/:id', buyCtrl.deleteBuyer);

module.exports = router;
