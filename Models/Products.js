const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema(
  {
    name : 
    {
       type: String,
      required : true
    }
    
  }, { timestamps : true }
);

module.exports = mongoose.model( 'Product', ProductSchema );