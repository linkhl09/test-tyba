const pool = require('./conn');

async function checkRevoked ( token ) {
  try{
    let resp = await pool.query("SELECT * FROM REVOKED_SESSIONS WHERE token = $1", [token]);
    if( resp.rowCount === 1 )
      return true;
  }
  catch ( error ) {
    console.error( error );
  }
  return false;
}

async function revoke ( token ){
  try{
    const res = await pool.query(
      "INSERT INTO REVOKED_SESSIONS(token) VALUES ($1)",
      [token]
    );
    return true;
  }
  catch ( error ){
    console.error( error );
  }
  return false;
}

module.exports = {
  checkRevoked,
  revoke
}