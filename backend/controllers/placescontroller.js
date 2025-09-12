const db = require('../db'); // e.g., MySQL or PostgreSQL connection

exports.getPlaces = async (req, res) => {
	const { time, isDayRent } = req.query;
	const [day, month, year] = time.split('.');

	const timeStart = Math.floor(new Date(year, month - 1, day, isDayRent ? 6 : 14).getTime() / 1000);
	const timeEnd = Math.floor(
		new Date(
			year,
			month - 1, isDayRent ? day : day + 1,
			isDayRent ? 18 : 14
		).getTime() / 1000);

	let [rows] = await db.query('SELECT * FROM lake_places');
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
		return row;
	})
	res.json(rows);
	return rows;
};

exports.updatePlace = async (req, res) => {
	try {
		const {id, x, y} = req;
		const [rows] = await db.query('SELECT * FROM lake_places WHERE id = ?', [id]);
		const row = rows[0];
		row.x = x;
		row.y = y;

		await db.query(
			'UPDATE lake_places SET x = ?, y = ? WHERE id = ?',
			[x, y, id]
		);

		return row;
	} catch (error) {
		console.error('Error updating place:', error);
		throw error;
	}
};