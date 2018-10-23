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
  Reporter: {
    type: String,
    default: 'darkie8'
  },
  createdOn :{
    type:Date,
    default:""
  }

})


mongoose.model('Issue', issueSchema);