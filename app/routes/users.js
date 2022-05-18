const Express = require( 'express' );
let router = Express.Router();
const Joi = require('joi');
const users = require('../database/users');
const auth = require('../lib/utils/auth');
const hist = require('../database/history');


router.post( '/register', async ( req, res, next ) => {
  // Validate body
  const { error } = validateRegisterUser(req.body);
  if( error ) return res.status( 400 ).json( error.details );
  
  // Add to the history 
  hist.addToHistory({
    endpoint: '/api/users/register',
    username: req.body.username
  });

  // Execute the request
  let created = await users.registerUser( req.body );
  if( created == true )
    return res.status(200).json({
      success: true,
      message: "User created",
    });
  else
    return res.status(500).json({
      message: "Error",
      details: created.detail
    });
});

router.post('/login', async ( req, res, next ) => {
  // Validate content
  const { error } = validateLoginData( req.body );
  if( error ) return res.status( 400 ).json( error.details );

  // Execute the request
  let aproved = await users.login( req.body );  // check credentials
  if( aproved ){
    let nToken = auth.createToken({
      username: req.body.username, 
      email: req.body.email
    });
    // Add to the history 
    hist.addToHistory({
      endpoint: '/api/users/login',
      username: req.body.username
    });
    // Send response
    return res.status(200).json({
      success: true,
      message: "Loged in",
      token: nToken
    });
  }  
  else
    return res.status(401).json({
      message: "Error",
      details: "Auth error, check credentials"
    });
});

router.get('/logout', async (req, res, next) => {
  // Check authorization
  let authorized = auth.checkToken( req.headers );
  if ( !(await authorized).success ) 
    return res.status( 401 ).json({
      message: "No esta autorizado para ver este recurso"
    });


  // Add to the history 
  hist.addToHistory({
    endpoint: '/api/users/logout',
    username: authorized.username
  });
  
  // Execute the request
  let revoked = auth.revokeToken( req.headers );
  if( revoked )
    return res.status(200).send("Sesión terminada");
});


/**
 * Validates the inputs from the register user form.
 * @param {object} reqData Data received from a request.
 * @returns {string} Error message with the information of the errors in the request.
 */
const validateRegisterUser = ( reqData ) => {
  // Create the validation object.
  const schema = Joi.object({
    username : Joi.string().pattern(/^[a-zA-Z0-9_-]*$/).required(),
    email : Joi.string().email({minDomainSegments: 2}).required(),
    password : Joi.string().min(8).required(),
    passwordConf : Joi.ref('password')
  });

  return schema.validate( reqData );
}

/**
 * Validates the inputs in the login.
 * @param {object} loginData Data received from the login request.
 * @returns {string} Error message with the information of the errors in the request.
 */
const validateLoginData = ( loginData ) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  
  return schema.validate( loginData );
}

module.exports = router;