require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Get public path
const publicPath = path.join(__dirname, '..', 'build');

// Use public folder
app.use(express.static(publicPath));

// Set up cors before routes!
app.use(cors());

// use React app as home page
app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

// Get url and query from our client side and then make request below
app.get('/api/v1/profile-search', async (req, res) => {
	try {
		// eg. http://localhost:4000/api/v1/profile-search?q=
		const searchString = `${req.query.q}`;

		const results = await axios.get(
			`https://api.github.com/users/${searchString}?client_id=${process.env.CID}&client_secret=${process.env.CS}`
		);
		const profile = await results.data;

		return res.json({
			success: true,
			profile
		});
	} catch (err) {
		return res.json({
			success: false,
			message: `Error with status of ${err.response.status}`
		});
	}
});

app.get('/api/v1/repo-search', async (req, res) => {
	try {
		// eg. http://localhost:4000/api/v1/repo-search?q=
		const searchString = `${req.query.q}`;

		const results = await axios.get(
			`https://api.github.com/users/${searchString}/repos?per_page=${process.env.RC}&sort=${process.env.RS}&client_id=${process.env.CID}&client_secret=${process.env.CS}`
		);
		const repos = await results.data;

		return res.json({
			success: true,
			repos
		});
	} catch (err) {
		return res.json({
			success: false,
			message: `Error with status of ${err.response.status}`
		});
	}
});

app.listen(port, () => console.log(`Proxy Server listening on port ${port}!`));
