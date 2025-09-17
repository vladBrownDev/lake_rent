"use client";

import styles from "./MapControls.module.css";

export default function MapControls({setAction, action, setType, type}) {
	const handleRadio = (e) => {
		setAction(e.target.id === 'add_radio' ? 'add' : 'remove')
	}

	const handleTypeRadio = (e) => {
		const type = e.target.id.split('_radio')[0];
		setType(type)
	}

	return(
		<div className={styles.wrapper}>
			<div className={styles.actionSelector}>
				<h3>Дія:</h3>
				<div>
					<input
						type="radio"
						checked={action === 'add'}
						id="add_radio"
						name="action_radio"
						onChange={handleRadio}
					/>
					<label htmlFor="add_radio">Додавання точок</label>
				</div>
				<div>
					<input
						type="radio"
						checked={action === 'remove'}
						id="delete_radio"
						name="action_radio"
						onChange={handleRadio}
					/>
					<label htmlFor="delete_radio">Видалення точок</label>
				</div>
			</div>
			<div className={styles.typeSelector}>
				<h3>Тип :</h3>
				<div>
					<input
						type="radio"
						checked={type === 'fishing'}
						id="fishing_radio"
						name="type_radio"
						onChange={handleTypeRadio}
					/>
					<label htmlFor="fishing_radio">Місце для рибалки</label>
				</div>
				<div>
					<input
						type="radio"
						checked={type === 'sm_altanka'}
						id="sm_altanka_radio"
						name="type_radio"
						onChange={handleTypeRadio}
					/>
					<label htmlFor="sm_altanka_radio">Маленька альтанка</label>
				</div>
				<div>
					<input
						type="radio"
						checked={type === 'big_altanka'}
						id="big_altanka_radio"
						name="type_radio"
						onChange={handleTypeRadio}
					/>
					<label htmlFor="big_altanka_radio">Велика альтанка</label>
				</div>
				<div>
					<input
						type="radio"
						checked={type === 'sm_forest_altanka'}
						id="sm_forest_altanka_radio"
						name="type_radio"
						onChange={handleTypeRadio}
					/>
					<label htmlFor="sm_forest_altanka_radio">Маленька альтанка у лісі</label>
				</div>
				<div>
					<input
						type="radio"
						checked={type === 'big_forest_altanka'}
						id="big_forest_altanka_radio"
						name="type_radio"
						onChange={handleTypeRadio}
					/>
					<label htmlFor="big_forest_altanka_radio">Велика альтанка у лісі</label>
				</div>
			</div>
		</div>
	)
}
