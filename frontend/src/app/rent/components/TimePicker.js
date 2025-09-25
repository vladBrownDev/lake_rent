'use client'

import styles from "./TimePicker.module.css";
import flatpickr from "flatpickr";
import { useEffect, useRef } from "react";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js";
import '@/css/flatpickr.css';

export default function TimePicker({ setTime, isDayRent, setIsDayRent }) {
	const picker = useRef(null);

	useEffect(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		flatpickr(picker.current, {
			dateFormat: "d.m.Y",
			defaultDate: tomorrow,
			minDate: "today",
			locale: Ukrainian,
			onChange: (selectedDates, dateStr) => {
				setTime(dateStr);
			},
		});
	}, []);

	function handleRadio(e) {
		const isDay = e.target.id === "day_radio";
		setIsDayRent(isDay ? e.target.checked : !e.target.checked);
	}

	return (
		<div className={styles.timepicker}>
			<h2>Оберіть дату та час</h2>

			<div className={styles.flatpickr}>
				<label htmlFor="date">Дата:</label>
				<input id="date" type={'text'} ref={picker} />
			</div>

			<div className={styles.typechooser}>
				<input
					type="radio"
					checked={isDayRent}
					id="day_radio"
					name="time_radio"
					onChange={handleRadio}
					className={styles.hiddenRadio}
				/>
				<label
					htmlFor="day_radio"
					className={`${styles.option} ${isDayRent ? styles.active : ""}`}
				>
					День <span>(6:00-18:00)</span>
				</label>

				<input
					type="radio"
					onChange={handleRadio}
					checked={!isDayRent}
					id="24h_radio"
					name="time_radio"
					className={styles.hiddenRadio}
				/>
				<label
					htmlFor="24h_radio"
					className={`${styles.option} ${!isDayRent ? styles.active : ""}`}
				>
					Доба <span>(14:00-12:00 наст. дня)</span>
				</label>
			</div>
		</div>
	);
}
