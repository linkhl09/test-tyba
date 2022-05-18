const express = require('express');
let router = express.Router();
const hist = require('../database/history');
const auth = require('../lib/utils/auth');


router.get('/', async ( req, res, next ) => {
  let authorized = await auth.checkToken( req.headers ); // Check if the token is valid
  if ( !authorized.success ) return res.status( 401 ).json({
    message: "No esta autorizado para ver este recurso"
  });

  let history = await hist.getHistory();
  if( history === false )
    return res.status(500).send('Server internal error'); // Error on the db
  else
    return res.status(200).json(history);
});

module.exports = router;