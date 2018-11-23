const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const time = require('./../libs/timeLib');
const tokenLib = require("./tokenLib");
const check = require("./checkLib");
const response = require('./responseLib')
const redisLib = require("./redisLib");
const commentController = require('../controllers/commentController');
const issueController = require('../controllers/issueController')
// models 
const UserModel = mongoose.model('User_1')
const IssueModel = mongoose.model('Issue_4')
const CommentModel = mongoose.model('commentSchema_1');

let setServer = (server) => {
    let io = socketio.listen(server)
    let commentIo = io.of('/comment')

    // 1st 
    commentIo.on('connection', (socket) => {

        socket.emit('verify', "socket trying to verify user")
    })

    // 2nd
    commentIo.on('token-verify', (authToken) => {
        tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {

            // if any groups inside this user exists or not
            if (err) {
                console.log(`some error occurred`)
                socket.emit('auth-error', {
                    status: 500,
                    error: 'Please provide correct auth token'
                })
            } else {
                let currentUser = user.data;
                // setting socket user id 
                socket.userId = currentUser.userId
                socket.userName = `${currentUser.firstName} ${currentUser.lastName}`
                socket.emit('verified', 'send issueInfo')


            }
        })
    });
    // 3rd create
    commentIo.on('issue', (issue) => {
        let currentIssue = issue;
        socket.issueId = issue.issueId;
        let key = socket.userName;
        let value = issue.title;
        redisLib.setThingsInHash('commenting-on-main-issue', key, value, (err, result) => {
            console.log('saving info');
            redisLib.getAllThingsInAHash('commenting-on-main-issue', (err, result1) => {
                if (err) {
                    console.log(err)
                } else {

                    console.log(`${key} is commenting on ${value}`);
                    // setting room name
                    socket.roomNotify = 'notification-box'
                    // joining room.
                    socket.join(socket.roomNotify)
                    socket.to(socket.roomNotify).broadcast.emit('commenting-notification', result1);


                }
            })
        })
    })
    // 4th create
    commentIo.on('comment', (comment) => {
        console.log('comment has been reached');

        comment['commentId'] = shortid.generate();
        comment['createdOn'] = time.now();
        comment['modifiedOn'] = time.now();
        console.log(comment);
        let comment = Promise.resolve(comment);
        comment.then(res => {
            let response = commentController.createComment(res);

            commentIo.emit('verified-save-comment', 'send issueInfo')
            let response2 = issueController.addComment(socket.issueId, total.comment.commentId)
            commentIo.emit('response', {response1: response, response2: response2})
            socket.roomComment = `${socket.issueId}`
            // joining room.
            socket.join(socket.roomComment)
            socket.to(socket.roomComment).broadcast.emit('comment-view', res);
        })


    })
    // 1 -> 2 
    // 3rd delete comment

    commentIo.on('issue-delete-hash', (total) => {
        let currentIssue = total.issue;
        socket.issueId = total.issue.issueId;
        let key = socket.userName;
        let value = total.issue.title;
        let bool = redisLib.deleteThingsFromHash('commenting-on-main-issue', key);
        let deleted = (bool) ? Promise.resolve(true) : Promise.reject(false);
        deleted.then(result => {
            console.log('deleting comment from main database');
            let response = commentController.deleteComment(total.comment.commentId)
            let response2 = issueController.deleteComment(socket.issueId, total.comment.commentId)
            commentIo.emit('response', {response1: response, response2: response2})
        })
    })




}
module.exports = {
    setServerGroup: setServer
}