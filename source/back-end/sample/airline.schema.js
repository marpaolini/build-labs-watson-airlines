const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  IATA_CODE: { type: String, require: true },
  AIRLINE: { type: String, require: true }
});

module.exports = Airline = mongoose.model("Airline", airlineSchema);