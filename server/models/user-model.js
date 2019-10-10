const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  bio: String,
  password: String,
  image: String,
  actionsCompleted: {type: Number, default: 0},
  currentStreak: {type: Number, default: 0},
  friends: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  lastAction: {type: Schema.Types.ObjectId, ref: 'Actions' }
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;