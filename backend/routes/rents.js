const express = require('express');
const router = express.Router();
const rentsController = require('../controllers/rentscontroller');
const auth = require('../middleware/auth');

router.get('/getRents', auth, rentsController.getRents);
router.post('/addRent', auth, async (req, res) => {
	await rentsController.addRent(req.body);
});

module.exports = router;