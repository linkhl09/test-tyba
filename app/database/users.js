const pool = require('./conn');
const md5  = require('md5');

async function registerUser( userData ){
  try{
    let password = md5( userData.password );
    const res = await pool.query(
      "INSERT INTO USERS(username, email, password) VALUES ($1, $2, $3);",
      [userData.username, userData.email, password]
    );
    return true;
  }
  catch( error ){
    console.error( error );
    return error;
  }
}

async function login( userData ){
  let username = userData.username;
  let password = userData.password;
  try{
    let resp = await pool.query("SELECT password FROM users WHERE username = $1;", [ username ] );
  
    password = md5( password );
    
    if( resp.rowCount === 1){
      resp = resp.rows[0];
      if( resp.password === password )
        return true;
      else
        return false;
    }
  }
  catch( error ){
    console.error( error );
    return false;
  }
}

module.exports = {
  registerUser,
  login
}