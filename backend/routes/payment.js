const LiqPay = require('../middleware/liqpay.js');
const auth = require("../middleware/auth");
const crypto = require('crypto');
const express = require("express");
const db = require('../db');
require('dotenv').config(); // load env variables
const router = express.Router();

const private_key = process.env.LIQPAY_PRIVATEKEY;
const public_key = process.env.LIQPAY_PUBKEY;

let orderItems = {};

router.get('/getPaymentInfo', auth, (req, res) => {
	const liqpay = new LiqPay(public_key, private_key);
	const orderId = req.query.orderId;

	const getPaymentInfo = async () => {
		const data = await liqpay.api("request", {
			"action"   : "status",
			"version"  : "6",
			"order_id" : orderId,
		});

		res.json(data);

	}

	getPaymentInfo();
});

router.put('/liqpay-callback', async (req, res) => {
	res.status(200).send('ok')
})

router.post('/liqpay-callback', async (req, res) => {
	const { data, signature, name, phone } = req.body;
	const private_key = process.env.LIQPAY_PRIVATEKEY;

	if (!data || !signature) {
		res.status(400).send('Missing data or signature');
	}

	// Validate signature
	const expectedSignature = crypto
		.createHash("sha1")
		.update(private_key + data + private_key)
		.digest("base64");

	if (signature !== expectedSignature) {
		res.status(403).send("Forbidden");
	}

	// Decode payment info
	let decoded;
	try {
		decoded = JSON.parse(Buffer.from(data, "base64").toString("utf8"));
	} catch (e) {
		res.status(400).send("Invalid data format");
	}

	const orderId = decoded.order_id;
	const rentItems = orderItems[orderId];

	res.status(200).send("OK");

	if(decoded.status === "success") {
		try {
			const [existingOrder] = await db.query(
				'SELECT * FROM lake_rents WHERE orderid = ?',
				[orderId]
			);

			if (!existingOrder.length) {
				const item = rentItems[0];
				const price = rentItems.reduce((acc, curr) => acc + +curr.price, 0);
				await db.query(
					'INSERT INTO lake_rents (timestart, timeend, placeid, name, phone, additional, orderid, price, paidamount, main) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
					[
						null,
						null,
						null,
						item.name,
						item.phone,
						JSON.stringify(item.additional) || null,
						orderId,
						price,
						item.paidamount,
						1
					]
				)

				rentItems.forEach(async (item) => {
					const message = `
📢 Нова бронь!
🎣 Місце: ${item.id}
👤 Ім'я: ${item.name || name}
📞 Телефон: ${item.phone || phone}
📅 Дата: ${item.date}
⏰ Час: ${new Date(item.timestart * 1000).toLocaleString()} - ${new Date(item.timeend * 1000).toLocaleString()}
💵 Ціна: ${item.price} грн
💵 Сплачено: ${item.paidamount} грн
🆔 OrderID: ${orderId}
			`;

					const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: +process.env.TELEGRAM_CHAT_ID,
							text: message,
						})
					});

					await db.query(
						'INSERT INTO lake_rents (timestart, timeend, placeid, name, phone, additional, orderid, price, paidamount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
						[
							item.timestart,
							item.timeend,
							item.id,
							item.name,
							item.phone,
							JSON.stringify(item.additional) || null,
							orderId,
							item.price,
							item.paidamount
						]
					)
				})
			}
		} catch (error) {
			console.error('Database error:', error);
		}
	}
});

router.post("/create", (req, res) => {
	const { amount, orderId, description, result_url, server_url, items } = req.body;

	const payload = {
		public_key: process.env.LIQPAY_PUBKEY,
		version: 3,
		action: "pay",
		amount,
		currency: "UAH",
		description,
		order_id: orderId,
		result_url,
		server_url,
	};

	const data = Buffer.from(JSON.stringify(payload)).toString("base64");
	const signature = crypto
		.createHash("sha1")
		.update(process.env.LIQPAY_PRIVATEKEY + data + process.env.LIQPAY_PRIVATEKEY)
		.digest("base64");

	orderItems[orderId] = items;

	res.json({ data, signature });
});

router.post("/unpaidRent",  async(req, res) => {
	const {rentItems, orderId} = req.body;

	try {
		const [existingOrder] = await db.query(
			'SELECT * FROM lake_rents WHERE orderid = ?',
			[orderId]
		);

		if (!existingOrder.length) {
			const item = rentItems[0];
			const price = rentItems.reduce((acc, curr) => acc + +curr.price, 0);
			await db.query(
				'INSERT INTO lake_rents (timestart, timeend, placeid, name, phone, additional, orderid, price, paidamount, main) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				[
					null,
					null,
					null,
					item.name,
					item.phone,
					JSON.stringify(item.additional) || null,
					orderId,
					price,
					item.paidamount,
					1
				]
			)

			rentItems.forEach(async (item) => {
				const message = `
📢 Нова бронь!
🎣 Місце: ${item.id}
👤 Ім'я: ${item.name || name}
📞 Телефон: ${item.phone || phone}
📅 Дата: ${item.date}
⏰ Час: ${new Date(item.timestart * 1000).toLocaleString()} - ${new Date(item.timeend * 1000).toLocaleString()}
💵 Ціна: ${item.price} грн
💵 Сплачено: ${item.paidamount} грн
🆔 OrderID: ${orderId}
			`;

				const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chat_id: +process.env.TELEGRAM_CHAT_ID,
						text: message,
					})
				});

				await db.query(
					'INSERT INTO lake_rents (timestart, timeend, placeid, name, phone, additional, orderid, price, paidamount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
					[
						item.timestart,
						item.timeend,
						item.id,
						item.name,
						item.phone,
						JSON.stringify(item.additional) || null,
						orderId,
						item.price,
						item.paidamount
					]
				)
			})
		}
		res.json({status: 200})
	} catch (error) {
		console.error('Database error:', error);
	}
});

module.exports = router;