const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  AIRLINE: { type: String, require: true },
  FLIGHT_NUMBER: { type: Number, require: true },
  ORIGIN_AIRPORT: { type: String, require: true },
  DESTINATION_AIRPORT: { type: String, require: true },
  CANCELLED: { type: Boolean, require: true },
  DEPARTURE_DATE: { type: Date, require: true },
  ARRIVAL_DATE: { type: Date, require: true }
});

module.exports = Flight = mongoose.model("Flight", flightSchema);