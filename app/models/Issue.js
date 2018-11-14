const mongoose = require('mongoose')
 const Schema = mongoose.Schema;

  const date = require('./../libs/timeLib')
let issueSchema = new Schema({
  issueId: {
    type: String,
    index: true,
    unique: true
  },
  title: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'in-progress'
  },
  description: {
    type: String
  },
  reporter: {
    type: String,
    default: 'darkie8'
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


mongoose.model('Issue_3', issueSchema);