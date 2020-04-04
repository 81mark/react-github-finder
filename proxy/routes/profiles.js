const express = require('express');
const router = express.Router();
const axios = require('axios');

// define the home page route
router.get('/', async function (req, res) {
	try {
		// eg. http://localhost:5000/api/v1/profile-search?q=
		const searchString = `${req.query.q}`;

		const results = await axios.get(
			`https://api.github.com/users/${searchString}?client_id=${process.env.CID}&client_secret=${process.env.CS}`
			// `https://api.github.com/users/${searchString}?client_id=${CID}&client_secret=${CS}`
		);
		const profile = await results.data;

		return res.json({
			success: true,
			profile,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: `Error with status of ${err.response.status}`,
		});
	}
});

module.exports = router;
