const mongoose = require('mongoose')
 const Schema = mongoose.Schema;

 let commentSchema = new Schema({
    commentId: {
      type: String
    },
    createdBy: {
        type: String
    },
    assigned_personel: {
      type: Array,
      default: []
    },
    watcher: {
      type: Array,
      default: []
    },
    createdOn :{
      type:Date,
      default:""
    },
    modifiedOn: {
      type:Date,
      default:""
    },
    files: {
      type: String,
    }
  
  })
  
  
  mongoose.model('commentSchema', commentSchema);