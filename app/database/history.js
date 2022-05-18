const pool = require('./conn');

async function getHistory(){
  try{
    let resp = await pool.query(
      "SELECT * FROM HISTORY;"
    );
    return resp.rows;
  }
  catch(error){
    console.error( error );
    return false;
  }
}

async function addToHistory( data ){
  try{
    const res = await pool.query(
      "INSERT INTO HISTORY(endpoint, username, params) VALUES ($1, $2, $3);",
      [data.endpoint, data.username, data.params]
    );
    return true;
  }
  catch ( error ) {
    console.error( error );
    return false;
  }
}

module.exports = {
  getHistory,
  addToHistory
};