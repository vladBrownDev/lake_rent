import { LiqPayPay } from "react-liqpay";
import {useEffect, useState} from "react";

export default function Payform({id, rents}) {
	const [origin, setOrigin] = useState('');
	const [items, setItems] = useState([]);

	useEffect(() => {
		setOrigin(window.location.origin);

		const cartsStorage = localStorage.getItem('cart');
		const rents = cartsStorage ? JSON.parse(cartsStorage).items : [];

		setItems(rents);
	}, []);

	const amount = rents.reduce((acc, item) => acc + +item.price, 0)
	const orderId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;

	return (
		<>
			<div></div>

			<LiqPayPay
				publicKey={process.env.NEXT_PUBLIC_LIQPAY_PUBKEY}
				privateKey={process.env.NEXT_PUBLIC_LIQPAY_PRIVATEKEY}
				title={'Cплатити'}
				amount={amount}
				description={'Оплата за оренду, місця:' + rents.reduce((acc, item) => acc + `Місце ${item.id} ціна ${item.price}.`, '')}
				currency="UAH"
				orderId={orderId}
				result_url={origin + "/payresult?orderId=" + orderId}
				server_url={process.env.BACKEND_HOST/ + 'api/liqpay'}
				product_description="Rent of the place"
				style={{ maxWidth: '1024px', width: '100%', margin: '0 auto' }}
				disabled={amount === 0}
			/>
		</>
	);
}
