const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placescontroller');
const auth = require('../middleware/auth');

router.get('/getPlaces', auth, placesController.getPlaces);
router.post('/updatePlaces', auth, placesController.updatePlaces);

module.exports = router;