module.exports = (req, res, next) => {
	if (!req.headers.authorization) {
		//return res.status(401).json({ error: 'Unauthorized' });
	}
	// Normally verify JWT here
	next();
};