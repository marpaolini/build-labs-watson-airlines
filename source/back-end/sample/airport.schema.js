const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  IATA_CODE: { type: String, require: true },
  AIRPORT: { type: String, require: true },
  CITY: { type: String, require: true },
  STATE: { type: String, require: true },
  COUNTRY: { type: String, require: true }
});

module.exports = Airport = mongoose.model("Airport", airportSchema);