const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  bio: String,
  password: String,
  image: {type: String, default: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'},
  actionsCompleted: {type: Number, default: 0},
  currentStreak: {type: Number, default: 0},
  lastDayCompleted: Number,
  friends: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  actions: [{type: Schema.Types.ObjectId, ref: 'Actions'}],
  location: {
    city: String,
    state: String
  },
  isAdmin: {type: Boolean, default: false}
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;