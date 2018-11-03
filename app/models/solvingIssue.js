const mongoose = require('mongoose')
 const Schema = mongoose.Schema;

 let solvingIssue = new Schema({
    solveId: {
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
    },
    comments: {
      type: Array,
      default: []
    }
  
  })
  
  
  mongoose.model('solvingIssue', solvingIssue);