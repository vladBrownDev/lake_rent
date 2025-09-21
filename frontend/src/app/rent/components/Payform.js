import { useEffect, useState } from "react";
import styles from "./Payform.module.css";

export default function Payform({ rents, setRents }) {
	const [liqpayData, setLiqpayData] = useState(null);
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		setRents(rents.map(rent => {
			rent.phone = phone;
			rent.name = name;
			return rent;
		}))
	}, [phone, name]);

	useEffect(() => {
		const origin = window.location.origin;
		const cartsStorage = localStorage.getItem("cart");
		const cartItems = cartsStorage ? JSON.parse(cartsStorage).items : [];

		const amount = cartItems.reduce((acc, item) => acc + +item.price, 0);
		const orderId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
		console.log(rents)
		if (amount > 0) {
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payment/create`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount,
					orderId,
					items: rents,
					description:
						"Оплата за оренду, місця: " +
						cartItems
							.map((item) => `Місце ${item.id} ціна ${item.price}.`)
							.join(" "),
					result_url: origin + "/payresult?orderId=" + orderId,
					server_url:
						process.env.NEXT_PUBLIC_BACKEND_HOST + `/api/payment/liqpay-callback`,
				}),
			})
				.then((res) => res.json())
				.then((data) => setLiqpayData(data))
				.catch((err) => console.error("Error creating LiqPay order:", err));
		}
	}, [rents]);

	if (!liqpayData) return null;

	return (
		<form
			method="POST"
			action="https://www.liqpay.ua/api/3/checkout"
			acceptCharset="utf-8"
			className={styles.paymentForm}
		>
			<input type="hidden" name="data" value={liqpayData.data} />
			<input type="hidden" name="signature" value={liqpayData.signature} />
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder={'Ваше імʼя'}
				type="text"
				name="name"
			/>
			<input
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				placeholder={'Телефон'}
				type="text"
				name="phone"
			/>
			<button
				disabled={!phone || !name || rents.length === 0}
				type="submit"
				className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition"
			>
				Сплатити {rents.reduce((acc, el) => acc + +el.price, 0)} ₴
			</button>
		</form>
	);
}
