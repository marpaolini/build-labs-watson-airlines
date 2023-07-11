const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  IATA_CODE : String,
  AIRLINE : String
});

const airline = mongoose.model("airline", airlineSchema);

module.exports = airline;