const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model')

const suggestionSchema = new Schema({
  title: String,
  description: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  timesCompleted: {type: Number, default: 0} 
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;