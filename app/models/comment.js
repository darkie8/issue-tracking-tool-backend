const mongoose = require('mongoose')
 const Schema = mongoose.Schema;

 let commentSchema = new Schema({
    commentId: {
      type: String
    },
    description: {
      type: String,
    },
    createdBy: {
        type: String
    },
    createdOn :{
      type:Date,
      default:""
    },
    modifiedOn: {
      type:Date,
      default:""
    },
    like: {
      type: Number,
      default: 0
    },
    likegiver: {
      type: Array,
      default: []
    },
    dislike: {
      type: Number,
      default: 0
    },
    dislikegiver: {
      type: Array,
      default: []
    }
  
  })
  
  
  mongoose.model('commentSchema_2', commentSchema);