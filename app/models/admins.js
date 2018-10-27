const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const moderator = new Schema({
    name: {
        type: String,
        default: 'sayantan saha'
    },
  id: {
    type: String,
    unique: true
  },
  joiningTime: {
    type: Date,
    default: time.now()
  },
  leavingTime: {
      type: Date
  },
  active: {
      type: Boolean,
      default: false
  },
  email: {
      type: String,
      default: 'sdarkie9@gmail.com'
  }
})

module.exports = mongoose.model('moderator', moderator)
