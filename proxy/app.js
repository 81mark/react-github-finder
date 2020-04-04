const path = require('path');
const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Route Files
const profiles = require('./routes/profiles.js');
const repos = require('./routes/repos');

const app = express();
const port = process.env.PORT || 5000;

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param polution
app.use(hpp());

// Set up cors before routes!
app.use(cors());

// Get public path
const publicPath = path.join(__dirname, '..', 'build');

// Use public folder
// No need to get '/' index.html its auto static folder items!
app.use(express.static(publicPath));

// Routes
app.use('/api/v1/profile-search', profiles);
app.use('/api/v1/repo-search', repos);

app.listen(port, () => console.log(`Proxy Server listening on port ${port}!`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server and exit process
	// server.close(() => process.exit(1));
});
