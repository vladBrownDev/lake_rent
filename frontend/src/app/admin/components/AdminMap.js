"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import styles from "./AdminMap.module.css";
import {fetchPlacesData} from "@/services/fetchPlacesData";

export default function AdminMap({action, type, items, setItems}) {
	const [dragId, setDragId] = useState(null);
	const [windowSize, setWindowSize] = useState(1)

	useEffect(() => {
		fetchPlacesData('02.02.1970', false).then(res => {
			setItems(res.items);
		})
		setWindowSize(window.innerWidth > 1024 ? 1024 : window.innerWidth);
	}, []);

	const halfItem = (20 / windowSize) * 100;

	const handleAdd = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / windowSize * 100;
		const y = (e.clientY - rect.top) / windowSize * 100;
		setItems((prev) => [...prev, { id: items.at(-1)?.id + 1 || 1, x, y, type}]);
	};

	const startDrag = (id) => setDragId(id);
	const stopDrag = () => setDragId(null);

	const handleMove = (e) => {
		if (!dragId) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = (e.clientX - rect.left) / windowSize * 100;
		const y = (e.clientY - rect.top) / windowSize * 100;
		setItems((prev) =>
			prev.map((i) => (i.id === dragId ? { ...i, x, y } : i))
		);
	};

	const removeItem = (id) =>
		setItems((prev) => prev.filter((i) => i.id !== id));

	function getImage(type) {
		if(type === 'fishing') {
			return '/fishing.png';
		}
		if(type.includes('big')) {
			return '/bigaltanka.png';
		}
		return '/altanka.png';
	}

	return (
		<div
			className={styles.wrapper}
			onMouseMove={handleMove}
			onMouseUp={stopDrag}
		>
			<Image
				src="/map.png"
				alt="Lake map"
				fill
				className={styles.lakeImage}
				onClick={action === 'add' ? handleAdd : null}
			/>

			{items.map((item) => (
				<div
					key={item.id}
					className={styles.marker}
					onMouseDown={() => startDrag(item.id)}
					onClick={() => action === 'add' ? null : removeItem(item.id)}
					style={{ top: `${item.y - halfItem}%`, left: `${item.x - halfItem}%`, backgroundImage: `url(${getImage(item.type)})` }}
				>
					<span>{item.id}</span>
				</div>
			))}
		</div>
	);
}
