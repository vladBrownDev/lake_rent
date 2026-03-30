'use client'

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function PayresultWrapper() {
	const [status, setStatus] = useState("pending");

	useEffect(() => {
		const orderId = new URLSearchParams(window.location.search).get("orderId");
		if (!orderId) return;

		const url = process.env.NEXT_PUBLIC_BACKEND_HOST + `/api/payment/getPaymentInfo`;

		const params = new URLSearchParams({ orderId });
		fetch(`${url}?${params.toString()}`, {
			headers: {
				"ngrok-skip-browser-warning": "69420",
			}
		})
			.then((response) => response.json())
			.then((data) => setStatus(data.status))
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
		<>
			<main className={styles.container}>
				<div className={`${styles.card} ${styles[status]}`}>
					<h1>{title}</h1>
					<p>{message}</p>
				</div>
			</main>
		</>
	);
}
