const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model')

const actionsSchema = new Schema({
  title: String,
  description: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  timesCompleted: {type: Number, default: 0} 
});

const Actions = mongoose.model('Actions', actionsSchema);

module.exports = Actions;