const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionsDetail = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  question: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "userDetails" },
  topic: { type: String },

  followers: [{ user: { type: Schema.Types.ObjectId, ref: "userDetails" } }],

  answers: [{ answer: { type: Schema.Types.ObjectId, ref: "answer" } }],

  postDate: { type: Date }
});

module.exports = mongoose.model("questionsDetail", questionsDetail);
