const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatbotUserSchema = new Schema(
  {
    firtsName : String,
    email : String,
  }, { timestamps : true }
);

module.exports = mongoose.model( 'ChatbotUsers', ChatbotUserSchema );