const mysql = require('mysql2/promise'); // use promise-based API
require('dotenv').config(); // load env variables
// Create a connection pool (better than single connection)
console.log({
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || "3306",
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '',
	database: process.env.DB_NAME || 'fishing_lake',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});
const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || "3306",
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '',
	database: process.env.DB_NAME || 'fishing_lake',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports = pool;