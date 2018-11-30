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
const IssueModel = mongoose.model('Issue_4')

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
IssueModel.find({
iscommentId: req.params.commentId
}).select(' -__v -_id')
.lean()
.exec((err, result) => {
    callback.crudCallback(err, result, res, 'getSingleComment')
})
}


module.exports ={
    createComment: createComment,
    deleteComment: deleteComment,
    getSingleComment: getSingleComment
}