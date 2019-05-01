var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Question = require("../../Kafka-Backend/Models/topic");

//post a new question from a user
router.post("/", function(req, res) {
  console.log("Inside topic Post Request");

  console.log("Req Body : ", req.body);
  // const d = new Date().toISOString().slice(0, 10);

  //search whether a question alread exists
  //   Question.findOne({ question: req.body.question })
  //     .then(question => {
  //       if (question) {
  //         res.status(400).json("we have found a similar question");
  //       } else {
  //         var question = new Question({
  //           _id: new mongoose.Types.ObjectId(),
  //           question: req.body.question,
  //           user: req.user.id,
  //           topic: req.body.topic,
  //           postDate: new Date()
  //         });
  //         console.log(question);

  //         //add a new question if not already exists
  //         question
  //           .save()
  //           .then(question => {
  //             res.status(200).json({ message: "Question posted successfully" });
  //             console.log("Saved Question:" + question);
  //           })
  //           .catch(err => {
  //             res
  //               .status(404)
  //               .json({ message: "error in creating question:" + err });
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(404).json({ message: "error while creating a question" });
  //     });
});

module.exports = router;
