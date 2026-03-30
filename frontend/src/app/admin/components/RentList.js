// RentList.jsx
import 'react-tabulator/lib/styles.css';                // react-tabulator base styles
import 'react-tabulator/lib/css/tabulator_simple.css';     // full Tabulator theme (contains tree icons)
import { useEffect, useState, useRef } from "react";
import { ReactTabulator } from 'react-tabulator';
import styles from "./RentList.module.css";

export default function RentList() {
	const [rents, setRents] = useState([]);
	const tableRef = useRef(null);

	useEffect(() => {
		const fetchRents = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/rents/getRents`,
					{ headers: { "ngrok-skip-browser-warning": "69420" } }
				);
				const data = await res.json();
				setRents(data || []);
			} catch (err) {
				console.error("Failed to fetch rents", err);
			}
		};
		fetchRents();
	}, []);

	// safe formatter for unix timestamps
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

	// safe parser/formatter for your "additional" stringified JSON
	const additionalFormatter = (cell) => {
		try {
			const v = cell.getValue();
			if (!v) return "";
			const arr = typeof v === "string" ? JSON.parse(v) : v;
			if (!Array.isArray(arr)) return "";
			return arr.map((it) => it.title ?? "").join(" ");
		} catch (err) {
			return "";
		}
	};

	const columns = [
		{ title: "Імʼя", field: "name" },
		{ title: "Телефон", field: "phone" },
		{ title: "Номер місця", field: "placeid" },
		{
			title: "Початок аренди",
			field: "timestart",
			sorter: "number",
			formatter: formatDate,
		},
		{
			title: "Кінець аренди",
			field: "timeend",
			sorter: "number",
			formatter: formatDate,
		},
		{
			title: "Ціна",
			field: "price",
			sorter: "number",
			formatter: (el) => `${el.getValue()}₴`,
		},
		{
			title: "Сплачено",
			field: "paidamount",
			sorter: "number",
			formatter: (el) => el.getValue() ? `${el.getValue()}₴` : '',
		},
		{
			title: "Додаткове",
			field: "additional",
			formatter: additionalFormatter,
		},
	];

	// IMPORTANT: pass Tabulator options via the `options` prop
	const options = {
		dataTree: true,
		dataTreeChildField: "_children",   // your API uses _children
		dataTreeStartExpanded: true,       // expand so you can see it immediately
		dataTreeElementColumn: "name",     // show expand/collapse inside the name column
		movableRows: false,                // keep as you intended (can't be used when tree is enabled)
	};

	// small debug check after render to confirm table instance/options
	useEffect(() => {
		if (tableRef.current?.table) {
			// inspect in console to confirm Tabulator options and data
			console.log("Tabulator instance:", tableRef.current.table);
			console.log("Tabulator options:", tableRef.current.table.options);
			console.log("Table data (first row):", tableRef.current.table.getData()[0]);
		}
	}, [rents]);

	return (
		<div className={styles.rentsWrapper}>
			<h2>Аренди</h2>
			<ReactTabulator
				ref={tableRef}
				columns={columns}
				data={rents}
				options={options}              // <- pass options here, not top-level props
				layout="fitDataStretch"
			/>
		</div>
	);
}
