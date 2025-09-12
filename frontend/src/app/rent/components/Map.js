'use client'
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Map({time, setRents, rents, isDayRent}) {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const res = await axios.get(
					"http://localhost:4000/api/places/getPlaces",
					{
						params: {
							time,
							isDayRent
						}
					}
				);
				setPlaces(res.data);
			} catch (err) {
				console.error("Error fetching places:", err);
			}
		};
		fetchPlaces();
	}, [time, isDayRent]);

	function selectPlace(e) {

		const newRent = {
			id: e.target.dataset.id,
			date: time,
			additional: [],
			price: e.target.dataset.price,
			originalPrice: e.target.dataset.price,
			isDayRent
		}

		let newRents = [];

		const existingCopy = rents.find((el) => {
			return el.id === newRent.id && el.date === newRent.date && el.isDayRent === newRent.isDayRent
		});

		newRents = existingCopy ?
			rents.filter((el) => JSON.stringify(el) !== JSON.stringify(existingCopy)) :
			[...rents, ...[newRent]];

		setRents(newRents)

		localStorage.setItem('cart', JSON.stringify({items: newRents}));
	}

	return (
		<>
			<h2 className={styles.heading}>2.Оберіть місце</h2>
			<div className={styles.map}>
				{places.map((place, ind) => (
					<div
						onClick={selectPlace}
						style={{top:place.y + '%', left:place.x + '%'}}
						data-id={place.id}
						data-price={isDayRent ? place.dayprice : place.twfprice}
						className={`${styles.place} ${place.free ? styles.freePlace : styles.busyPlace}`}
						key={'place' + ind}>
							{place.id}
					</div>
				))}
			</div>
		</>
	);
}
