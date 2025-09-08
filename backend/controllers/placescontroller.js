const db = require('../db'); // e.g., MySQL or PostgreSQL connection

exports.getPlaces = async (req, res) => {
	const [rows] = await db.query('SELECT * FROM lake_places');
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