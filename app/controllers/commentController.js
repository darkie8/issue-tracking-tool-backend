const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const callback = require('./../libs/controllerCallbackLib');
const check = require('../libs/checkLib');
 // models
 require('./../models/comment');
const CommentModel = mongoose.model('commentSchema_2');
require('./../models/Issue');
const issueModel = mongoose.model('Issue_4')

let createComment = (comment) => {
    let commentMod = new CommentModel(comment)
    commentMod.save((err, newcomment) => {
        if (err) {
            logger.error(err.message, 'commentController: createcomment', 10)
            return response.generate(true, 'Failed to create commentr', 500, null)
            
        } else {
            logger.info('creation successful', 'commentController: createcomment', 5)
            return response.generate(false, 'comment created', 200, newcomment)
            
        }
    })
}
let deleteComment = (commentId) => {
    CommentModel.findOneAndDelete({
        commentId: commentId
    }).exec((err,res)=>{
        if (err) {
            logger.error(err.message, 'commentController: deleteComment', 10)
            return response.generate(true, 'Failed to delete commentr', 500, null)
            
        } else {
            logger.info('creation successful', 'commentController: deleteComment', 5)
            return response.generate(false, 'comment deleted', 200, res)
            
        }
    })
}

let getSingleComment =(req, res) => {
CommentModel.findOne({
commentId: req.params.commentId
}).select(' -__v -_id')
.lean()
.exec((err, result) => {
    callback.crudCallback(err, result, res, 'getSingleComment')
})
}


let addlike = (req, res) => {
    let increase = {
        modifiedOn: time.now(),
        '$inc': {
            "like": 1
        },
        '$push': {
            "likegiver": req.body.likegiver
        }
    }
    CommentModel.findOneAndUpdate({
        'commentId': req.params.commentId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addlike 
let deletelike = (req, res) => {
    let decrease = {
        modifiedOn: time.now(),
        '$inc': {
            "like": -1
        },
        '$pull': {
            "likegiver": req.body.likegiver
        }
    }
    CommentModel.findOneAndUpdate({
        'commentId': req.params.commentId
    }, decrease).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  deletelike
// adddislike
let adddislike = (req, res) => {
    let increase = {
        modifiedOn: time.now(),
        '$inc': {
            "dislike": 1
        },
        '$push': {
            "dislikegiver": req.body.dislikegiver
        }
    }
    CommentModel.findOneAndUpdate({
        'commentId': req.params.commentId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  adddislike 
// deletedislike
let deletedislike = (req, res) => {
    let decrease = {
        modifiedOn: time.now(),
        '$inc': {
            "dislike": -1
        },
        '$pull': {
            "dislikegiver": req.body.dislikegiver
        }
    }
    CommentModel.findOneAndUpdate({
        'commentId': req.params.commentId
    }, decrease).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  deletedislike


module.exports ={
    createComment: createComment,
    deleteComment: deleteComment,
    getSingleComment: getSingleComment,
    addlike: addlike,
    deletelike: deletelike,
    adddislike: adddislike,
    deletedislike: deletedislike,
}