const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//redis database
const redis = require("redis");

//autmtically connects localhost:6379
const client = redis.createClient();

const query = "5cc15777f4a06b2a6077c317" ;
//load credential model

const Profile = require("../../Kafka-Backend/Models/credentials");
//laod userDetails model
const User = require("../../Kafka-Backend/Models/userDetails");
//load validation
const validateProfileInput = require("../validation/profile");

//get current user's profile

 router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

client.get(req.user.id , function(err, value) {

  if(err){
    return console.log(err);
  }

  if(value)
  {
    console.log("Redis Cache has required value :", value);
    res.status(200).json(value);
    
  }
  else
  {

        const errors = {};
        Profile.findOne({ user: req.user.id })
          .then(profile => {

            if (!profile) {
              errors.noprofile = "There is no profile for this user";
              return res.status(404).json(errors);
            }
            else{
            
            // client.setex(
            //   'query',
            //   3600,
            //   JSON.stringify({ source: "Redis cache", value: res })
            // );

            console.log("I am coming here and lets try for REDIS now");
            console.log(req.user.id);
            console.log(profile);
            client.set(req.user.id, JSON.stringify(profile), function (err) {
              if (err) callback(err);
              else{ 
                console.log("REDIS Set successful");
             //     callback(null);
              }
          });

            console.log("profile==", profile);
            res.status(200).json(profile);
          }

            // client.setex(query, 10, function(err){
            //   if(err){
            //     console.log(err);
            //     return console.log(err);
            //   }
            // });
          })
          .catch(err => res.status(404).json(err));
      }


  }
  );
})

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         console.log(req.user.id );
//         if (!profile) {
//           errors.noprofile = "There is no profile for this user";
//           return res.status(404).json(errors);
//         }
//         res.status(200).json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

//create or edit user profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    //get fields
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return error

      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;

    //skills- split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //Topics -split into array
    if (typeof req.body.topics !== "undefined") {
      profileFields.topics = req.body.topics.split(",");
    }
    //
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.state) profileFields.state = req.body.state;
    if (req.body.zipCode) profileFields.zipCode = req.body.zipCode;
    // if(req.body.profileImage)profileFields.profileImage=req.body.profileImage;

    profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create
        //check if the handle exists
        profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "handle already exists";
            res.staus(400).json(errors);
          }
          //save new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  })
);

module.exports = router;
