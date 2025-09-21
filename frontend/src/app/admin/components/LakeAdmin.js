"use client";

import {useState} from "react";
import AdminMap from "@/app/admin/components/AdminMap";
import MapControls from "@/app/admin/components/MapControls";
import AdminPrices from "@/app/admin/components/AdminPrices";
import RentList from "@/app/admin/components/RentList";
import {updatePlacesData} from "@/services/updatePlacesData";
import styles from "./LakeAdmin.module.css";

export default function LakeAdmin() {
	const [action, setAction] = useState('add');
	const [type, setType] = useState('fishing');
	const [items, setItems] = useState([]);
	const [prices, setPrices] = useState([]);

	return (
		<>
			<MapControls type={type} setType={setType} setAction={setAction} action={action}/>
			<AdminMap items={items} setItems={setItems} type={type} action={action}/>
			<AdminPrices prices={prices} setPrices={setPrices}/>
			<RentList/>
			<button className={styles.saveBtn} onClick={() => {updatePlacesData(items, prices)}}>
				Зберегти
			</button>
		</>
	);
}
