const db = require('../db'); // e.g., MySQL or PostgreSQL connection

exports.getPlaces = async (req, res) => {
	const { time, isDayRent } = req.query;
	const isDayRentBool = isDayRent === 'true';
	const [day, month, year] = time.split('.').map(Number);

	const timeStart = Math.floor(new Date(year, month - 1, day, isDayRentBool ? 6 : 14).getTime() / 1000);
	const timeEnd = Math.floor(
		new Date(
			year,
			month - 1, isDayRentBool ? day : day + 1,
			isDayRentBool ? 18 : 12
		).getTime() / 1000);

	let [rows] = await db.query('SELECT * FROM lake_places');
	let [prices] = await db.query('SELECT * FROM lake_prices');
	let [conflictingRents] = await db.query(
		`
      SELECT placeid
      FROM lake_rents
      WHERE timestart <= ?
        AND timeend   >= ?
      `,
		[timeEnd, timeStart]
	);
	conflictingRents = conflictingRents.map(rent => rent.placeid);
	rows = rows.map((row) => {
		row.free = !conflictingRents.includes(row.id);
		const priceItem = prices.find(price => price.itemname === row.type);
		row.dayprice = priceItem.dayprice;
		row.twfprice = priceItem.twfprice;
		return row;
	})
	res.json({items: rows, prices});
	return rows;
};

exports.updatePlaces = async (req, res) => {
	try {
		const newPlaces = req.body.places;
		const newPrices = req.body.prices;

		// Step 1: Collect all IDs from the incoming data
		const newPlaceIds = newPlaces.map(place => place.id).filter(id => !!id);

		// Step 2: Delete rows that are not in the newPlaces array
		await db.query(
			`DELETE FROM lake_places
			 WHERE id NOT IN (${newPlaceIds.map(() => '?').join(',')})`,
			newPlaceIds
		);

		newPrices.forEach((price) => {
			db.query(
				`INSERT INTO lake_prices (id, itemname, dayprice, twfprice)
				 VALUES (?, ?, ?, ?)
				 ON DUPLICATE KEY UPDATE
				 id = VALUES(id),
				 dayprice = VALUES(dayprice),
				 twfprice = VALUES(twfprice)`,
				[price.id, price.itemname, price.dayprice, price.twfprice]
			);
		})

		// Step 3: Iterate over newPlaces to update or insert each place
		newPlaces.forEach(async (place) => {
			if (!place.x || !place.y || !place.type) {
				throw new Error('Invalid place data');
			}

			// UPDATE or INSERT depending on whether the id exists
			await db.query(
				`INSERT INTO lake_places (id, x, y, type, name, dayprice, twfprice)
         VALUES (?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                                  x = VALUES(x),
                                  y = VALUES(y),
                                  type = VALUES(type),
                                  name = VALUES(name),
                                  dayprice = VALUES(dayprice),
                                  twfprice = VALUES(twfprice)`,
				[
					place.id || null, // Allow null IDs for new rows
					place.x,
					place.y,
					place.type,
					place.name || null,
					place.dayprice || null,
					place.twfprice || null
				]
			);
		})

		res.json({ success: true });
	} catch (error) {
		console.error('Error updating places:', error);
		res.status(500).json({ success: false, message: error.message });
	}
};
