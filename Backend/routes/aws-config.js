const multer = require("multer");
//const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: "9dzVXyBQ0u17gAP9AVpKKpKq9EtRL/JtQxpt5M9n",
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: "AKIAIIMPEOJBLJABKMEQ",
  region: "us-east-1" // region of your bucket
});

const s3 = new aws.S3();
const upload = multer({
  // storage: multerS3({
  //   s3: s3,
  //   bucket: "quora-trail-bucket",
  //   acl: "public-read",
  //   metadata: function (req, file, cb) {
  //     cb(null, { fieldName: file.fieldname });
  //   },
  //   key: function (req, file, cb) {
  //     cb(null, Date.now().toString());
  //   }
  // })
});

module.exports = upload;
