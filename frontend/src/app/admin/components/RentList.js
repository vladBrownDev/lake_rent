import 'react-tabulator/lib/css/tabulator_simple.css';
import { useEffect, useState } from "react";
import { ReactTabulator } from 'react-tabulator';
import styles from "./RentList.module.css";
import axios from "axios";

export default function RentList() {
	const [rents, setRents] = useState([]);

	useEffect(() => {
		const fetchRents = async () => {
			try {
				const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_HOST + "/api/rents/getRents",
					{
						headers: new Headers({
							"ngrok-skip-browser-warning": "69420",
						})
					}
				);
				return res.data;
			} catch (err) {
				throw err;
			}
		};
		fetchRents().then(res => setRents(res));
	}, []);

	// util for formatting Unix timestamps
	const formatDate = (cell) => {
		const ts = cell.getValue();
		if (!ts) return "-";
		return new Date(ts * 1000).toLocaleString("uk-UA", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const columns = [
		{ title: "Імʼя", field: "name" },
		{ title: "Телефон", field: "phone" },
		{ title: "Номер місця", field: "placeid" },
		{
			title: "Початок аренди",
			field: "timestart",
			sorter: "number",        // keeps sorting by raw timestamp
			formatter: formatDate,
		},
		{
			title: "Кінець аренди",
			field: "timeend",
			sorter: "number",
			formatter: formatDate,
		},
		{
			title: "Сплачено",
			field: 'price',
			sorter: "number",
			formatter: (el) => `${el.getValue()}₴`,
		},
		{
			title: "Додаткове",
			field: 'additional',
			formatter: (el) => {
				const array = JSON.parse(el.getValue());
				if(!array) return '';
				return array.reduce((acc, item) => acc + (item.title ?? '') + ' ','');
			},
		}
	];

	return (
		<div className={styles.rentsWrapper}>
			<h2>Аренди</h2>
			<ReactTabulator
				data={rents}
				columns={columns}
				layout="fitDataStretch"
			/>
		</div>
	);
}
