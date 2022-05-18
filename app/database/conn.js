const { Pool } = require( 'pg' );

// The connection params are configured from the .env
const pool = new Pool();

// Export only the query function
module.exports = { 
  query: ( text, params ) => {
    return pool.query( text, params );
  }
};