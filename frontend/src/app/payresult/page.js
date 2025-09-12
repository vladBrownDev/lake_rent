'use client'

import {useState, useEffect} from "react";
import axios from "axios";

export default function Payresult() {
	const [status, setStatus] = useState('pending');

	useEffect(() => {
		const orderId = window.location.search.split('=')[1];
		const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/payment/getPaymentInfo`;

		axios.get(url, {
			params: {
				orderId: orderId
			}
		}).then(response => {setStatus(response.data.status);})
	})

	function getString(status) {
		let message = '';
		switch (status) {
			case 'failed':
				message = 'Невдача ('
				break;
			case 'success':
				message = 'Сплачено! Гарної рибалки!'
				break;
			default:
				message = 'Очікуйте, іде обробка'
				break;
		}
		return message;
	}
	return (
		<main>
			{getString(status)}
		</main>
	);
}
