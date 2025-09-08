'use client'

import styles from "./TimePicker.module.css";
import flatpickr from "flatpickr";
import {useEffect, useRef} from "react";
import { Ukrainian } from "flatpickr/dist/l10n/uk.js"
import '@/css/flatpickr.css';

export default function TimePicker() {
	const picker = useRef(null);

	useEffect(() => {
		flatpickr(picker.current, {
			dateFormat: "Y-m-d",
			defaultDate: new Date(),
			locale: Ukrainian,
		});
	}, []);

	return (
		<div className={styles.timepicker}>
			<div>
				<input type="radio" defaultChecked id="day_radio" name="time_radio"/><label htmlFor="day_radio">День(6:00-18:00)</label>
				<input type="radio" id="24h_radio" name="time_radio"/><label htmlFor="24h_radio">Доба(14:00-12:00 наступного дня)</label>
			</div>
			<div>Дата: <input ref={picker}/></div>
		</div>
	);
}
