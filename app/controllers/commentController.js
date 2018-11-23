const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const callback = require('./../libs/controllerCallbackLib');
const check = require('../libs/checkLib');
 // model
const CommentModel = mongoose.model('commentSchema_1');


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
module.exports ={
    createComment: createComment,
    deleteComment: deleteComment
}