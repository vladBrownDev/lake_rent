'use client'
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { fetchPlacesData } from "@/services/fetchPlacesData";

export default function Map({ time, setRents, rents, isDayRent }) {
	const [places, setPlaces] = useState([]);
	const [notification, setNotification] = useState("");
	const [mapSize, setMapSize] = useState(1)

	useEffect(() => {
		fetchPlacesData(time, isDayRent).then((res) => {
			setPlaces(res.items);
		}).catch((err) => {
			const errorDetails = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
			const responseData = err.response ? `\nResponse Data: ${JSON.stringify(err.response.data, null, 2)}` : '';
			alert(`Error fetching places: ${err.message}\n\nDetails:\n${errorDetails}${responseData}`);
		});
		setMapSize(window.innerWidth > 1024 ? 1024 : window.innerWidth);
	}, [time, isDayRent]);

	const halfItem = (20 / mapSize) * 100;

	function getImage(type) {
		if (type === "fishing") {
			return "/fishing.png";
		}
		if (type.includes("big")) {
			return "/bigaltanka.png";
		}
		return "/altanka.png";
	}

	function selectPlace(e) {
		const [day, month, year] = time.split(".");

		const timeStart = Math.floor(
			new Date(year, month - 1, day, isDayRent ? 6 : 14).getTime() / 1000
		);
		const timeEnd = Math.floor(
			new Date(
				year,
				month - 1,
				isDayRent ? day : Number(day) + 1,
				isDayRent ? 18 : 12
			).getTime() / 1000
		);

		const newRent = {
			id: e.target.dataset.id,
			timestart: timeStart,
			timeend: timeEnd,
			date: time,
			additional: [],
			price: e.target.dataset.price,
			originalPrice: e.target.dataset.price,
			isDayRent,
		};

		const existingCopy = rents.find(
			(el) =>
				el.id === newRent.id &&
				el.date === newRent.date &&
				el.isDayRent === newRent.isDayRent
		);

		const newRents = existingCopy
			? rents.filter((el) => JSON.stringify(el) !== JSON.stringify(existingCopy))
			: [...rents, newRent];

		setRents(newRents);
		try {
			localStorage.setItem("cart", JSON.stringify({ items: newRents }));
		} catch (e) {
			console.error("LocalStorage error:", e);
		}

		if (!existingCopy) {
			setNotification("Додано у кошик");
			setTimeout(() => setNotification(""), 2500);
		}
	}

	return (
		<>
			<h2 className={styles.heading}>Оберіть місце</h2>

			{notification && <div className={styles.notification}>{notification}</div>}

			<div className={styles.map}>
				{places.map((place, ind) => (
					<div
						onClick={selectPlace}
						style={{
							top: place.y - halfItem + "%",
							left: place.x - halfItem + "%",
							backgroundImage: `url(${getImage(place.type)})`,
						}}
						data-id={place.id}
						data-price={isDayRent ? place.dayprice : place.twfprice}
						className={`${styles.place} ${
							place.free ? styles.freePlace : styles.busyPlace
						}`}
						key={"place" + ind}
					>
						<span>{place.id}</span>
					</div>
				))}
			</div>
		</>
	);
}
