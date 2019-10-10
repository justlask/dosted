const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')
const Actions = require('../models/actions')

const bcryptSalt = 10

mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     username: 'tester1',
//     password: bcrypt.hashSync('tester1', bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: 'admin',
//     password: bcrypt.hashSync('admin', bcrypt.genSaltSync(bcryptSalt)),
//   },
// ]

// User.deleteMany()
//   .then(() => {
//     return User.create(users)
//   })
//   .then(usersCreated => {
//     console.log(`${usersCreated.length} users created with the following id:`)
//     console.log(usersCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })




// let actions = [
//   {
//     title: 'teach someone something',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'help someone with a task',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'smile at a stranger',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'do something to help someone, or even just offer',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'say no to single use plastic today',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'pick up some rubbish/trash',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'find an organization and sign up to volunteer',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'hold the door for someone',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'give someone a ride home',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'give someone a compliment',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'ask how someone is doing',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'call one of your familiy members or friends',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'help an elderly person',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: 'tell a joke',
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "say 'have a good day' in the elevator to the people that are in there even if you don't know them",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "hug a friend",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "tell someone you appreciate them",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "buy a reusable water bottle",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "eat a meatless meal today",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "don't use plastic today",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "bring and use your own bags to the grocery store",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "find your local farmers market and shop there this week",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "donate money or your time to a charity",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
//   {
//     title: "do something you know you will never be rewarded or paid back for",
//     creator: '5d9f4015b1b5ba09b24becca',
//   },
// ]



// Actions.deleteMany()
//   .then(() => {
//     return Actions.create(actions)
//   })
//   .then(actionsCreated => {
//     console.log(`${actionsCreated.length} users created with the following id:`)
//     console.log(actionsCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })