const db = require('../db');

exports.getRents = async (req, res) => {
	const [rows] = await db.query('SELECT * FROM lake_rents');
	const formattedRows = [];
	rows.forEach((row) => {
		if(row.main === 1) {
			let children = rows.filter((el) => el.main !== 1 && el.orderId === row.orderId);
			children = children.map(el => {
				el.paidamount = ''
				return el;
			})
			row._children = children;
			formattedRows.push(row);
		}
	})
	res.json(formattedRows);
	return rows;
};

/**
 * Adds a rent to the lake_rents table
 * @param {Object} rentDetails - Details of the rent
 * @param {number} rentDetails.timestart - Start timestamp of the rent
 * @param {number} rentDetails.timeend - End timestamp of the rent
 * @param {number} rentDetails.placeid - ID of the rented place
 * @param {string} rentDetails.name - Name of the renter
 * @param {string} rentDetails.phone - Phone number of the renter
 * @param {string} [rentDetails.additional] - Additional details (optional)
 * @returns {Object} The inserted rent record with its `id`
 */

exports.addRent = async (rentDetails) => {
	const { timestart, timeend, placeid, name, phone, additional } = rentDetails;

	try {
		const query = `
        INSERT INTO lake_rents (timestart, timeend, placeid, name, phone, additional)
        VALUES (?, ?, ?, ?, ?, ?)
		`;
		const [result] = await db.query(query, [
			timestart,
			timeend,
			placeid,
			name,
			phone,
			additional || null,
		]);

		// Return the inserted rent details with ID
		return {
			id: result.insertId,
			timestart,
			timeend,
			placeid,
			name,
			phone,
			additional: additional || null,
		};
	} catch (error) {
		console.error('Error adding rent:', error);
		throw error;
	}
};
