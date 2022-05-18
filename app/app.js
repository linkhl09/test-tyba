//Import the required packages for the app.
const express = require('express');

// Import the routes
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');
const historyRouter = require('./routes/history');

/**
 * Start the main app and configure express
 */
const app = express();
// incoming data config
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// Set Routing files
app.use( '/api/users',  usersRouter );
app.use( '/api/locations',  locationsRouter ); 
app.use( '/api/history',    historyRouter );

module.exports = app;