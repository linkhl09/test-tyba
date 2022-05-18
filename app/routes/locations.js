const express = require('express');
let router = express.Router();
const Joi = require('joi');
const auth = require('../lib/utils/auth');
const axios = require('axios');
const hist = require('../database/history');

router.get('/', async (req, res, next ) =>{
  // Check authorization
  let authorized = await auth.checkToken( req.headers );
  if ( !authorized.success ) 
    return res.status( 401 ).json({
      message: "No esta autorizado para ver este recurso"
    });

  // Validate body
  const {error} = validateParamsLocation( req.body );
  if( error ) return res.status( 400 ).json( error.details );

  // Process the request
  let gKey = process.env.GOOGLE_KEY;
  let endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.latitud},${req.body.longitud}&radius=${req.body.radio}&type=restaurant&key=${gKey}`;
  const response = await axios.get(endpoint);
  // Add to the history
  hist.addToHistory({
    endpoint: '/api/locations',
    username: authorized.username,
    params: req.body
  });
  
  // Send response
  if( !response ) 
    return res.status(400).json({
      success: false,
      message: "No se obtuvieron resultados en la consulta"
    });
  else
    if( response.data ){
      let restaurants = [];
      /**
       * Format the output response
       */
      response.data.results.map( ( res ) => {
        let restaurant = {
          name: res.name,
          isOpen: res.opening_hours? res.opening_hours.open_now: 'unkown',
          address: res.vicinity,
          rating: res.rating,
          totalRatings: res.user_ratings_total,
          restaurantType: res.types,
        };
        restaurants.push( restaurant );
      });
      return res.status(200).json({
        success: true,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        radious: req.body.radio,
        results: restaurants
      });
    }
});

/**
 * Validates the params for the locations endpoint.
 * @param {object} params Parameters for the request
 * @returns {string} Error message with the information of the errors in the request.
 */
const validateParamsLocation = ( params ) => {
  const schema = Joi.object({
    latitud: Joi.string().required(),
    longitud: Joi.string().required(),
    radio: Joi.number().required()
  });
  return schema.validate( params );
}

module.exports = router;