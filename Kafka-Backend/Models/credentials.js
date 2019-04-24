const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentials = new Schema ({

    education : [
        {
            school : { type: String }, 
            concentration : { type: String }, 
            degree : { type: String }, 
            year : { type: String },    
        }
        ],
        employment : [
            {
                position : { type: String }, 
                company : { type: String }, 
                startYear : { type: String }, 
                endYear : { type: String },    
          }
        ],
        topics : [{
            type: String
        }],
    
        userDetails: [{ user: { type: Schema.Types.ObjectId, ref: "userDetails" } }],
        
    });

    module.exports = mongoose.model("credentials",credentials);