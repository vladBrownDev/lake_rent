import Image from "next/image";
import styles from "./page.module.css";
import Map from "./components/Map";
import TimePicker from "./components/TimePicker";

export default function Rent() {
	return (
		<div className={styles.page}>
			<TimePicker/>
			<Map/>
		</div>
	);
}
