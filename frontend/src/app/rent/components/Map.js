'use client'
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Map() {
	const [places, setPlaces] = useState([]);

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const res = await axios.get(
					"http://localhost:4000/api/places/getPlaces"
				);
				setPlaces(res.data);
			} catch (err) {
				console.error("Error fetching places:", err);
			}
		};

		fetchPlaces();
	}, []);

	return (
		<div className={styles.map}>
			{places.map((place, ind) => (
				<div style={{top:place.y + '%', left:place.x + '%'}} className={styles.place} key={'place' + ind}>{place.id}</div>
			))}
		</div>
	);
}
