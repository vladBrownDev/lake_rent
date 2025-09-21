'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Payresult() {
	const [status, setStatus] = useState("pending");

	useEffect(() => {
		const orderId = new URLSearchParams(window.location.search).get("orderId");
		if (!orderId) return;

		const url = process.env.NEXT_PUBLIC_BACKEND_HOST + `/api/payment/getPaymentInfo`;

		axios
			.get(url, {
				params: { orderId } ,
				headers: new Headers({
					"ngrok-skip-browser-warning": "69420",
				})
			})
			.then((response) => setStatus(response.data.status))
			.catch(() => setStatus("failed"));
	}, []);

	function getMessage(status) {
		switch (status) {
			case "failed":
				return {
					title: "Невдача",
					message: "Оплата не пройшла. Спробуйте ще раз.",
				};
			case "success":
				return {
					title: "Сплачено!",
					message: "Дякуємо за оплату. Гарної рибалки! 🎣",
				};
			default:
				return {
					title: "Очікування",
					message: "Ваш платіж обробляється. Будь ласка, зачекайте...",
				};
		}
	}

	const { title, message } = getMessage(status);

	return (
		<main className={styles.container}>
			<div className={`${styles.card} ${styles[status]}`}>
				<h1>{title}</h1>
				<p>{message}</p>
			</div>
		</main>
	);
}
