//Signup.js - Signup route module
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware

var requireAuth = passport.authenticate('jwt', { session: false });
const secret = "secret";

var ObjectId = require('mongodb').ObjectID
var UserModel = require('../../Kafka-Backend/Models/userDetails');
var MessageModel = require('../../Kafka-Backend/Models/message');
///Users/sachinwaghmode/Desktop/Quora-Team/Kafka-Backend/connection.js
//Kafka
//var kafka = require('../kafka/client');


var controller = {};

controller.getPeopleDetails = function (req, cb) {
    console.log("inside getPeopleDetails")
    db.collection('userdetails').find({}).toArray((err, row) => {
      if (err) {
        cb(true,null)
      } else {
        console.log("rows: ", row);
        for(var i=0; i<row.length; i++)
        delete row[i].password;
        console.log("data sent back: ", row);
        cb(null, row);
      }
    })
};

router.get('/peopledetails', (req, res, next)=>{
    controller.getPeopleDetails(req, (err, row)=>{
        if(err){
            res.status(400);
        }
        else{
            res.status(200).send(row);
        }
    })
});

controller.sendMessage = function (req, cb) {
        console.log("req.bod: ",req.body);
        let message=[{sender: req.body.sender, receiver: req.body.receiver, date: req.body.date, message:req.body.message}]
      db.collection('inboxdetails').insertOne({
          originalreceiver: req.body.receiver,
          originalsender:req.body.sender,
          subject: req.body.subject,
          messages: message,
          date: req.body.date
        }, (err, row)=>{
          if (err) {
            console.log("error in query storing");
            cb(true,null)
          } else {
            console.log("data inserted into the database");
            cb(null, row[0]);
          }
        }
        );
  }

  router.post('/sendmessage', (req, res, next)=>{
    controller.sendMessage(req, (err, row)=>{
        if(err){
            res.status(400);
        }
        else{
            res.status(200).send(row[0]);
        }
    })
});

controller.displayMessages=function (req, cb) {
    console.log("display messages: ",req.body);
    singletonDb.getInstance().then(db=>{
      db.collection('inboxdetails').find({
          $or:[
                {"messages.sender": req.body.email},
                {"messages.receiver": req.body.email}
            ]
          })
      .toArray()
      .then((row)=>{
          console.log("data sent back: ", row);
          cb(null, row);
      },(err)=>{
          cb(true,null)
      })
    })
  };

  router.post('/displaymessages', (req, res, next)=>{
    controller.displayMessages(req, (err, row)=>{
        if(err){
            res.status(400);
        }
        else{
            res.status(200).send(row);
        }
    })
});

controller.replyMessages=function (req, cb) {
    console.log(req.body);
    let x=req.body._id;
    console.log("req.body._id:: ",req.body);
    let newmessage={
        sender:req.body.sender,
        receiver:req.body.receiver,
        date:req.body.date,
        message:req.body.newmessage
    }
    singletonDb.getInstance().then(db=>{
        db.collection('inboxdetails').findOneAndUpdate({
            _id:ObjectId(req.body._id)
        }, {
            $push:{
                messages: newmessage
            }
        }, {returnOriginal:false})
        .then((row1)=>{
            console.log("rowwwwwwadkfmfs: ",row1);
            console.log("data sent backkkkkkaidskn: ",row1.value);
            console.log("row.value.message: ",row1.value.messages);
            cb(null, row1);
        }, (err)=>{
            cb(true,null)
        })
    })
  };
  router.post('/reply', (req, res, next)=>{
    controller.reply(req, (err, row1)=>{
        if(err){
            res.status(400);
        }
        else{
            res.status(200).send(row1);
        }
    })
});
module.exports = router;