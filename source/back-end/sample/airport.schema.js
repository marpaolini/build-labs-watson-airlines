const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  IATA_CODE : String,
  AIRPORT : String,
  CITY : String,
  STATE : String,
  COUNTRY : String
});

const airport = mongoose.model("airport", airportSchema);

module.exports = airport;