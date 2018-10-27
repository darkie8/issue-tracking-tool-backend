const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const callback = require('./../libs/controllerCallbackLib');
// Models

const moderatorModel = mongoose.model('moderator');


// get all moderator's name 
let allModerators = (req,res) => {
    moderatorModel.find()
    .select(' -__v -_id -id ')
    .lean()
    .exec((err,res)=> {
        callback.crudCallback(err, result, res, 'allModerators')
    })
}

// get single moderator's name 