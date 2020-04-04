const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async function (req, res) {
	try {
		// eg. http://localhost:5000/api/v1/repo-search?q=
		const searchString = `${req.query.q}`;

		const results = await axios.get(
			`https://api.github.com/users/${searchString}/repos?per_page=${process.env.RC}&sort=${process.env.RS}&client_id=${process.env.CID}&client_secret=${process.env.CS}`
			// `https://api.github.com/users/${searchString}/repos?per_page=${RC}&sort=${RS}&client_id=${CID}&client_secret=${CS}`
		);
		const repos = await results.data;

		return res.json({
			success: true,
			repos,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: `Error with status of ${err.response.status}`,
		});
	}
});

module.exports = router;
