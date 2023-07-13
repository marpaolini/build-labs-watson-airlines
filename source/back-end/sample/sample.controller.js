const { request, response } = require("express");
const mongoose = require('mongoose');

// Mongoose Schemas
const Flight = require('./flight.schema');
const Airport = require('./airport.schema');
const Airline = require('./airline.schema');

/**
 * Sample Controller
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

const getAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find().exec();
        res.json({ airlines });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAirlines,
    getFlights,
    getFlightsByAirports,
    getFlightsByDateRange
};