const express    = require('express');
const authRoutes = express.Router();
const nodemailer = require('nodemailer')

const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const uploadCloud = require('../configs/cloudinary');

// require the user model !!!!
const User       = require('../models/user-model');


authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username:username,
            password: hashPass
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }

                        // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});



authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
  
      if (!theUser) {
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }

          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
    console.log(req)
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.get('/profile', (req,res,next) => {
    User.findById(req.user.id).populate('actions').then(data => {
        res.json(data)
    }).catch(err => next(err))
});


authRoutes.delete('/delete', (req,res,next) => {
        User.findByIdAndRemove(req.user.id).then(data => {
          req.logout();
          res.status(200).json({ message: 'Deleted successfully' });
        }).catch(err => next(err))
});


authRoutes.post('/updatepassword', (req, res, next) => {
    // find the user by the email | username

    User.find({ email: req.body.email })
    .then(user => {

        if (user === null) {
            // handle case if no email | username is found
            res.status(400).json({ message: 'No account with that email exists.'});
            return;
        }
        else {
            User.findByIdAndUpdate(user._id)
            .then(data => {



                // send email with new pass here
            })


        }


        
    })


    // change password to a random hashed pass
    // email that hashed pass to that email with nodemailer
    // 
});

module.exports = authRoutes;