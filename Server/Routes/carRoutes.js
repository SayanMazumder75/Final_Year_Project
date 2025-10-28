const router = require('express').Router();
const carCtrl = require('../Controllers/carCtrl');
const auth = require('../middleware/auth');       // JWT auth
const authOwner = require('../middleware/authOwner'); // Owner-only middleware

// POST car ad - only owner can create
router.post('/cars', auth, authOwner, carCtrl.createCar);

// GET all cars - anyone can view
router.get('/cars', carCtrl.getAllCars);

module.exports = router;
