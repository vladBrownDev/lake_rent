'use client'

import styles from "../page.module.css";
import {useEffect, useState} from "react";

import Map from "@/app/rent/components/Map";
import TimePicker from "@/app/rent/components/TimePicker";
import Payform from "@/app/rent/components/Payform";
import RentItem from "@/app/rent/components/RentItem";
import Image from "next/image";

function getTomorrowDate() {
	const today = new Date();
	today.setDate(today.getDate() + 1);

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${day}.${month}.${year}`;
}

export default function RentWrapper() {
	const [time, setTime] = useState(getTomorrowDate());
	const [rents, setRents] = useState([])
	const [isDayRent, setIsDayRent] = useState(true);

	useEffect( () => {
		const cartsStorage = localStorage.getItem('cart');
		const rents = cartsStorage ? JSON.parse(cartsStorage).items : [];
		setRents(rents);
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify({items: rents}));
	}, [rents])

	return (
		<>
			<div id={'rentWrapper'} className={styles.rentWrapper}>
				<TimePicker setTime={setTime} isDayRent={isDayRent} setIsDayRent={setIsDayRent}/>
				<Map setRents={setRents} isDayRent={isDayRent} rents={rents} time={time}/>
				<div className={styles.rentItemWrapper}>
					{rents.map((rent) => (
						<RentItem key={`${rent.id}_${rent.date}_${rent.isDayRent}`} rent={rent} rents={rents} setRents={setRents}/>
					))}
				</div>
				<Payform setRents={setRents} rents={rents}/>
				<Image src="/price.PNG" alt="Ціни на рибу" width={1000} height={400} className={styles.priceImage} />
			</div>
		</>
	);
}
