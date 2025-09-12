import styles from "./RentItem.module.css";

export default function RentItem({setRents, rents, rent}) {
	function handleAddition(e) {
		const updatedRents = rents.map(item => {
			if (item.id !== rent.id) return item;

			if(e.target.checked) {
				item.additional.push({name: e.target.dataset.field, price: e.target.dataset.price});
			}
			else {
				item.additional = item.additional.filter(item => item.name !== e.target.dataset.field);
			}
			const priceChange = item.additional.reduce((acc, item) => (acc + +item.price), 0);
			item.price = +item.originalPrice + priceChange;
			return item;
		});
		setRents(updatedRents);
	}

	const additions = [
		{
			price: 100,
			field: "addition_drova",
			title: 'Дрова(+100грн)'
		}
	];

	function removeRent() {
		setRents(rents.filter(item => {
			return item.id !== rent.id || item.date !== rent.date || item.isDayRent !== rent.isDayRent
		}));
	}

	return (
		<div className={styles.additional}>
			<h4>Місце {rent.id} <button onClick={removeRent}>⨉</button></h4>
			<div className={styles.additionalWrapper}>
				<div>
					<h4>Доп послуги</h4>
					{additions.map(item => (
						<div key={`${rent.id}_${item.field}`}>
							<input
								data-price={item.price}
								data-field={item.field}
								checked={rent.additional.some(additem => additem.name === item.field)}
								onChange={handleAddition}
								type="checkbox"
								id={'addition_drova' + rent.id}
							/>
							<label htmlFor={"addition_drova" + rent.id}>{item.title}</label>
						</div>
					))}
				</div>
			</div>
			<div>
				Дата: {rent.date}, час: {rent.isDayRent ? '6:00-18:00' : '14:00-12:00 наступного дня'}
			</div>
			<div>
				Ціна: {rent.price}
			</div>
		</div>
	);
}
