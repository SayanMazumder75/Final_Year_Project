const router = require('express').Router();
const rentalCtrl = require('../controllers/rentalCtrl')

// Rental routes
router.post('/', rentalCtrl.createRental);
router.get('/', rentalCtrl.getAllRentals);
router.get('/:id', rentalCtrl.getRentalById);
router.delete('/:id', rentalCtrl.deleteRental);

module.exports = router;
