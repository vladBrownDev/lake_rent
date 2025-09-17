const LiqPay = require('../middleware/liqpay.js');
const auth = require("../middleware/auth");
const express = require("express");
require('dotenv').config(); // load env variables
const router = express.Router();

router.get('/getPaymentInfo', auth, (req, res) => {
	const private_key = process.env.LIQPAY_PRIVATEKEY;
	const liqpay = new LiqPay(process.env.LIQPAY_PUBKEY, private_key);

	const getPaymentInfo = async () => {
		const data = await liqpay.api("request", {
			"action"   : "status",
			"version"  : "6",
			"order_id" : req.query.orderId,
		});
		res.json(data);
	}

	getPaymentInfo();
});

module.exports = router;