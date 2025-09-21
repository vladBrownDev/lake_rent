"use client";

import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./AdminPrices.module.css";
import {fetchPlacesData} from "@/services/fetchPlacesData";

export default function AdminPrices({prices, setPrices}) {

	useEffect(() => {
		fetchPlacesData('02.02.1970', false).then(res => {
			setPrices(res.prices);
		});
	}, []);

	const itemStrings = {
		fishing: 'Місце для рибалки',
		sm_altanka: 'Маленька альтанка',
		big_altanka: 'Велика альтанка',
		sm_forest_altanka: 'Маленька альтанка у лісі',
		big_forest_altanka: 'Велика альтанка у лісі',
		house: 'Будинок',
		drova: 'Дрова',
	}

	const handleInput = (e) => {
		const newPrices = prices.map((price) => {
			if(e.target.dataset.itemname === price.itemname) {
				price[e.target.dataset.time] = e.target.value;
				return price;
			}
			return price;
		})
		setPrices(newPrices);
	}

	return (
		<div className={styles.pricesWrapper}>
			<h2>Змінити ціни</h2>
			<div>
				<div className={styles.priceHeading}>
					<div></div>
					<h4>День</h4>
					<h4>Доба</h4>
				</div>
				{prices.map((price) => (
					<div className={styles.priceItem} key={price.id + '_price'}>
						<label htmlFor={price.itemname + '_dayprice'}>{itemStrings[price.itemname]}</label>
						<input
							id={price.itemname + '_dayprice'}
							onChange={handleInput}
							data-time={'dayprice'}
							data-itemname={price.itemname}
							type="number"
							value={price.dayprice}
						/>
						<input
							id={price.itemname + '_twfprice'}
							onChange={handleInput}
							data-time={'twfprice'}
							data-itemname={price.itemname}
							type="number"
							value={price.twfprice}/>
					</div>
				))}
			</div>
		</div>
	);
}
