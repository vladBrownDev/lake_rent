import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Payform.module.css";

export default function Payform({ rents, setRents }) {
	const [liqpayData, setLiqpayData] = useState(null);
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [payType, setPayType] = useState('full');
	const [notification, setNotification] = useState("");

	const amount = rents.reduce((acc, el) => acc + +el.price, 0);

	function calcPartAmount(amount) {
		if(!amount) return 0;
		if(amount < 1000) return 300;
		if(amount > 2000) return 700;
		return 500;
	}

	const calcPaidAmount = (price) => {
		switch(payType) {
			case 'full':
				return price;
			case 'part':
				return calcPartAmount(price);
			case 'none':
				return 0;
		}
	}

	useEffect(() => {
		const origin = window.location.origin;
		const cartsStorage = localStorage.getItem("cart");
		const cartItems = cartsStorage ? JSON.parse(cartsStorage).items : [];

		const amount = cartItems.reduce((acc, item) => acc + +item.price, 0);
		const orderId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;

		if (amount > 0) {
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payment/create`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: payType === 'part' ? calcPartAmount(amount) : amount,
					orderId,
					items: rents.map(rent => {
						rent.phone = phone;
						rent.name = name;
						rent.payType = payType;
						rent.paidamount = calcPaidAmount(amount);
						return rent;
					}),
					description:
						"Оплата за оренду, місця: " +
						cartItems
							.map(
								(item) =>
									`Місце ${item.id}, ${item.date}, ${
										item.isDayRent ? "6:00-18:00" : "14:00-12:00 наст. дня"
									} ціна ${item.price}.`
							)
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
	}, [rents, payType]);

	function changePayType(e) {
		e.preventDefault();
		setPayType(e.target.dataset.paytype);
	}

	function handleUnpaid() {
		const orderId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;

		axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payment/unpaidRent`, {
			rentItems: rents.map(rent => {
				rent.phone = phone;
				rent.name = name;
				rent.payType = payType;
				rent.paidamount = calcPaidAmount(amount);
				return rent;
			}),
			orderId
		});

		localStorage.removeItem('cart');

		setNotification("Дякуємо за бронювання! З вами звʼяжуться для уточнення деталів");
		setName('');
		setPhone('');
		setRents([]);
	}

	if (!liqpayData) return null;

	if(payType === 'none') {
		return (
			<div className={styles.paymentForm}>
				{notification && <div className={styles.notification}>{notification}</div>}
				<div className={styles.payTypeWrapper}>
					<button
						data-paytype={'full'}
						onClick={changePayType}
						data-selected={payType === 'full'}
						className={styles.payTypeSwitch}
					>
						Повна
					</button>
					<button
						data-paytype={'part'}
						onClick={changePayType}
						data-selected={payType === 'part'}
						className={styles.payTypeSwitch}
					>
						Часткова
					</button>
					<button
						data-paytype={'none'}
						onClick={changePayType}
						data-selected={payType === 'none'}
						className={styles.payTypeSwitch}
					>
						На місці
					</button>
				</div>
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
					className={styles.payButton}
					onClick={handleUnpaid}
				>
					Забронювати
				</button>
			</div>
		);
	}

	return (
		<form
			method="POST"
			action="https://www.liqpay.ua/api/3/checkout"
			acceptCharset="utf-8"
			onSubmit={() => {localStorage.removeItem('cart')}}
			className={styles.paymentForm}
		>
			<div className={styles.payTypeWrapper}>
				<button
					data-paytype={'full'}
					onClick={changePayType}
					data-selected={payType === 'full'}
					className={styles.payTypeSwitch}
				>
					Повна
				</button>
				<button
					data-paytype={'part'}
					onClick={changePayType}
					data-selected={payType === 'part'}
					className={styles.payTypeSwitch}
				>
					Часткова
				</button>
				<button
					data-paytype={'none'}
					onClick={changePayType}
					data-selected={payType === 'none'}
					className={styles.payTypeSwitch}
				>
					На місці
				</button>
			</div>
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
				className={styles.payButton}
			>
				Сплатити {payType === 'part' ? calcPartAmount(amount) : amount} ₴
			</button>
			{payType === 'part' ? <span>+{amount - calcPartAmount(amount)}₴ на місці</span> : ''}
		</form>
	);
}
