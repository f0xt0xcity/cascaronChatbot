const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChatbotUserSchema = new Schema(
  {
    firstName : String,
    email : String,
    asunt : String,
    complete : {
      type : Boolean,
      default : false
    }
    
  }, { timestamps : true }
);

module.exports = mongoose.model( 'ChatbotUsers', ChatbotUserSchema );