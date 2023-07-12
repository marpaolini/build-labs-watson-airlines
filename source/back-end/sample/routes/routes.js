const {Router} = require ('express');  //importando la funcion router de la libreria express

const path = require('path');  //importando path y asignandolo a const path

const {getFlights} = require ('../sample.controller'); //importando esquema de vuelos

const router = Router(); 

//endpoints

router.get('/', (req, res) => {
    res.sendFile(path.resolve('/source/front-end','index.html'))
});

router.get('/vuelos', getFlights);








module.exports = {router};