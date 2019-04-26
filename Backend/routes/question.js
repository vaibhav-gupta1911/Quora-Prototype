var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Question = require("../../Kafka-Backend/Models/question");

//post a new question from a user
router.post("/", requireAuth, function(req, res) {
  console.log("Inside question Post Request");

  console.log("Req Body : ", req.body);
  // const d = new Date().toISOString().slice(0, 10);

  //search whether a question alread exists
  Question.findOne({ question: req.body.question })
    .then(question => {
      if (question) {
        res.status(400).json("we have found a similar question");
      } else {
        var question = new Question({
          _id: new mongoose.Types.ObjectId(),
          question: req.body.question,
          user: req.user.id,
          topic: req.body.topic,
          postDate: new Date()
        });
        console.log(question);

        //add a new question if not already exists
        question
          .save()
          .then(question => {
            res.status(200).json({ message: "Question posted successfully" });
            console.log("Saved Question:" + question);
          })
          .catch(err => {
            res
              .status(404)
              .json({ message: "error in creating question:" + err });
            console.log(err);
          });
      }
    })
    .catch(err => {
      res.status(404).json({ message: "error while creating a question" });
    });
});

// get all questions asked by a user
router.get("/", requireAuth, (req, res) => {
  console.log(req.user.id);
  Question.find({ user: req.user.id }).then(question => {
    console.log(question);
  });
});

module.exports = router;

//Laxmikant question post query

// Question.findOne(
//   {
//     question: req.body.question
//   },
//   (err, user) => {
//     if (err) {
//       console.log("Unable to fetch Question details.", err);
//       res.end(JSON.stringify(user));
//     }

//     if (user) {
//       res.value = "The question is already present in database.";
//       res.end(JSON.stringify(res.value));
//     } else {
//       req.body.question = "abc";
//       req.body.questionOwner = "Lucky";
//       req.body.topic = "topic";
//       req.body.postDate = "2019/12/12";

//       var user = new Model({
//         _id: new mongoose.Types.ObjectId(),
//         question: req.body.question,
//         questionOwner: req.user.id,
//         topic: req.body.topic,
//         postDate: Date.now()
//       });

//       user.save().then(
//         doc => {
//           console.log("Question saved successfully.", doc);
//           res.value = "Question saved successfully.";
//           res.end(JSON.stringify(res.value));
//         },
//         err => {
//           console.log("Unable to save Question details.", err);
//           res.value = "Unable to save Question details.";
//           res.end(JSON.stringify(res.value));
//         }
//       );
//     }
//   }
// );
