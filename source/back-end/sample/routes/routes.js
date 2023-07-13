const { Router } = require('express');  //importando la funcion router de la libreria express
const path = require('path');  //importando path y asignandolo a const path
const { getFlights, getAirlines, getFlightsByAirports, getFlightsByDateRange } = require('../sample.controller'); //importando esquema de vuelos
const router = Router();

//endpoints

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end', 'index.html'));
});

router.get('/vuelos/:id', getFlights);
router.get('/porAeropuerto', getFlightsByAirports);
router.get('/porFecha', getFlightsByDateRange);
router.get('/aerolineas', getAirlines)

module.exports = { router };