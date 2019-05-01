const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var message = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  from: { type: String },
  to: { type: String },
  sentDate: { type: Date },
  message: { type: String }
});

<<<<<<< HEAD
    originalreceiver: {type:String},
    originalsender:{type:String},
    subject: {type:String},
    messages: [{sender: {type:String}, receiver: {type:String}, date: {type:Date}, message:{type:String}}],
    date: {type:Date}
    });

    module.exports = mongoose.model("message",message);
=======
module.exports = mongoose.model("message", message);
>>>>>>> 62e133f58c471b614d25933ecc6c38cf31657f15
