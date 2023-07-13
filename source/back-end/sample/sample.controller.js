const { request, response } = require("express");
const mongoose = require('mongoose');
// Mongoose Schemas
const Flight = require('./flight.schema');
const Airport = require('./airport.schema');
const Airline = require('./airline.schema');

/**
 * getFlights requires a flight id query to return the flight referenced by that id.
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */

const getFlights = async (req = request, res = response) => {

    try {
        const flights = await Flight.findById(req.params.id).exec();
        if (!flights) {
            return res.status(404).json({
                error: "Flight not found"
            });
        }
        res.json({
            result: flights
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

/**
 * getFlightsByAirports requires two queries with IATA code type originAirport, destinationAirport to return the flights referenced by the query.
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */

const getFlightsByAirports = async (req, res) => {
    try {
        const { originAirport, destinationAirport } = req.query;

        if (!originAirport || !destinationAirport) {
            return res.status(404).json({ error: 'Missing required parameters' });
        }

        const flights = await Flight.find({
            ORIGIN_AIRPORT: originAirport,
            DESTINATION_AIRPORT: destinationAirport,
        }).exec();

        res.json({ flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * getFlightsByDateRange requires a departure date query to return the flights referenced by that departure date. But the information can leak through the airline, the origin airport and the destination airport. Everything in IATA Code.
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */

const getFlightsByDateRange = async (req, res) => {
    try {
        const { departureDate, airline, originAirport, destinationAirport } = req.query;

        if (!departureDate) {
            return res.status(404).json({ error: 'Missing required parameter: departureDate' });
        }

        let query = {
            DEPARTURE_DATE: {
                $gte: new Date(departureDate),
            },
        };

        if (airline) {
            query.AIRLINE = airline;
        }

        if (originAirport) {
            query.ORIGIN_AIRPORT = originAirport;
        }

        if (destinationAirport) {
            query.DESTINATION_AIRPORT = destinationAirport;
        }

        const flights = await Flight.find(query).exec();

        res.json({ flights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * getAirlines only requires an IATA code query to return the associated airlines.
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */

const getAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find().exec();
        res.json({ airlines });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

/**
 * getAirport requires a query of the airport with IATA code to return the airports.
 * @param {JSON} req request information
 * @param {JSON} res response information
 * @returns {JSON} return description
 */

const getAirport = async (req, res) => {
    try {
        const { airport } = req.query;

        if (!airport) {
            return res.status(404).json({ error: 'Missing required parameters' });
        }

        const airports = await Airport.findOne({
            IATA_CODE: airport}).exec();

        res.json({ airports });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAirlines,
    getFlights,
    getFlightsByAirports,
    getFlightsByDateRange,
    getAirport
};