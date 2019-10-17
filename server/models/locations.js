const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  lat: String,
  long: String
});

const Locations = mongoose.model('Locations', locationSchema);

module.exports = Locations;