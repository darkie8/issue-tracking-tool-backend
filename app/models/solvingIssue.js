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
      type: Array,
      default: []
    },
    comments: {
      type: Array,
      default: []
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
  
  
  mongoose.model('solvingIssue_2', solvingIssue);