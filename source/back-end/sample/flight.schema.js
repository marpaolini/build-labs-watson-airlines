const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  AIRLINE : String,
  FLIGHT_NUMBER : Number,
  ORIGIN_AIRPORT : String,
  DESTINATION_AIRPORT: String,
  CANCELLED : Boolean,
  DEPARTURE_DATE : Date,
  ARRIVAL_DATE: Date
});

const flight = mongoose.model("flight", flightSchema);

module.exports = flight;