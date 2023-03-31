const mongoose = require('mongoose');

const sample_schema = new mongoose.Schema({
  ATTRIBUTE_1 : String,
  ATTRIBUTE_2 : Number,
  ATTRIBUTE_3 : Boolean,
  ATTRIBUTE_4 : Date,
});

const Sample = mongoose.model("Sample", sample_schema);

module.exports = Sample;