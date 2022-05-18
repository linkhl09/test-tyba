let jwt = require('jsonwebtoken');
let sessions = require('../../database/sessions');

const createToken = ( user ) => {
  let jwt_secret = process.env.JWT_SECRET;
  return jwt.sign({ user: user }, jwt_secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}

const checkToken = async ( headers ) => {
  let jwt_secret = process.env.JWT_SECRET;
  let token = headers['access-token'];
  if( token ){
    try{
      let decoded = await jwt.verify( token, jwt_secret );
      return {
        success: ! await sessions.checkRevoked( token ),
        username: decoded.user.username
      };
    }
    catch ( error ){
      console.error( error )
      return {
        success: false,
        message: "Token is not valid",
      };
    }
  }
  else
    return {
      success: false,
      message: "Auth token is not supplied",
    };
}

const revokeToken = ( headers ) => {
  let jwt_secret = process.env.JWT_SECRET;
  let token = headers['access-token'];
  if( token ){
    try{
      let decoded = jwt.verify( token, jwt_secret);
      sessions.revoke( token );
      return {
        success: true,
        message: "Log out"
      };
    }
    catch ( error ){
      return {
        success: false,
        message: "Token is not valid",
      };
    }
  }
  else
    return {
      success: false,
      message: "Session token is not supplied",
    };
}

module.exports = {
  createToken,
  checkToken,
  revokeToken
}