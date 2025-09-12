'use client'

import styles from "./TimePicker.module.css";
import flatpickr from "flatpickr";
import {useEffect, useRef} from "react";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
import '@/css/flatpickr.css';

export default function TimePicker({setTime, isDayRent, setIsDayRent}) {
	const picker = useRef(null);

	useEffect(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		flatpickr(picker.current, {
			dateFormat: "d.m.Y",
			defaultDate: tomorrow,
			locale: Ukrainian,
			onChange: (selectedDates, dateStr) => {
				setTime(dateStr);
			},
		});
	}, []);

	function handleRadio(e) {
		const isDay = e.target.id === 'day_radio';
		setIsDayRent(isDay ? e.target.checked : !e.target.checked)
	}

	return (
		<div className={styles.timepicker}>
			<h2>1. Оберіть дату та час</h2>
			<div className={styles.flatpickr}>Дата: <input ref={picker}/></div>
			<div className={styles.typechooser}>
				<div>
					<input
						type="radio"
						checked={isDayRent}
						id="day_radio"
						name="time_radio"
						onChange={handleRadio}
					/>
					<label htmlFor="day_radio">День(6:00-18:00)</label>
				</div>
				<div>
					<input
						type="radio"
						onChange={handleRadio}
						checked={!isDayRent}
						id="24h_radio"
						name="time_radio"
					/>
					<label htmlFor="24h_radio">Доба(14:00-12:00 наступного дня)</label>
				</div>
			</div>
		</div>
	);
}
