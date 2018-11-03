const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const callback = require('./../libs/controllerCallbackLib');

// models
const UserModel = mongoose.model('User_1')
const IssueModel = mongoose.model('Issue_1')

let getAllIssues = (req, res) => {
    IssueModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getAllIssues')
        })
} // end get all issues

let getAllIssuesPaginate = (req, res) => {
    let paginatingTime = req.body.paginatingTime

    IssueModel.find().skip(paginatingTime).limit(10)
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getAllIssues')
        })
} // end getAllIssuesPaginate

let getSingleIssue = (req, res) => {
    IssueModel.findOne({
            'issueId': req.params.issueId
        })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getSingleIssue')
        })
} // end getSingleIssue


let deleteIssue = (req, res) => {

    IssueModel.findOneAndRemove({
        'issueId': req.body.issueId
    }).exec((err, result) => {
        callback.crudCallback(err, result, res, 'deleteIssue')
    }); // end user model find and remove


} // end delete user




let createIssue = (req, res) => {
    let issue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        reporter: req.body.reporter,
        createdOn: time.now(),
        modifiedOne: time.now(),
        file: ""
    })

    issue.save((err, newIssue) => {
        if (err) {
            logger.error(err.message, 'issueController: createIssue', 10)
            let apiResponse = response.generate(true, 'Failed to create new User', 500, null)
            res.send(apiResponse);
        } else {
            logger.info('creation successful', 'issueController: createIssue', 5)
            let apiResponse = response.generate(false, 'Issue created', 200, newIssue)
            res.send(apiResponse);
        }
    })



} // end creating issue


let editTitle = (req, res) => {
    let option = {
        title: req.body.title,
        '$set': {modifiedOn: time.now()}
    }

    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, option).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // end editTitle

let editDescription = (req, res) => {
    let option = {

        description: req.body.description,
        '$set': {modifiedOn: time.now()}
    }

    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, option).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // end editTitle

let addAssignee = (req, res) => {
    let push = { '$and': [{
        '$push': {
            "assigned_personel": req.body.assigneeId
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, push).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addAssignee

let deleteAssignee = (req, res) => {
    let pull = { '$and' :[{
        '$pull': {
            "assigned_personel": req.body.assigneeId
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, pull).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // delete  addAssignee
let addWatcher = (req, res) => {
    let push = { '$and' :[{
        '$push': {
            "watcher": req.body.assigneeId
        }},{
            '$set': {modifiedOn: time.now()}
        }]}
    
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, push).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addWatcher 
let deleteWatcher = (req, res) => {
    let pull = { '$and' :[{
        '$pull': {
            "watcher": req.body.assigneeId
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, pull).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // delete  addAssignee

let addlike = (req, res) => {
    let increase = { '$and': [{
        '$inc': {
            "like": 1
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addlike 
let deletelike = (req, res) => {
    let decrease = { '$and':[{
        '$inc': {
            "like": -1
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, decrease).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  deletelike

let adddislike = (req, res) => {
    let increase = { '$and':[{
        '$inc': {
            "dislike": 1
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addlike 
let deletedislike = (req, res) => {
    let decrease = { '$and': [{
        '$inc': {
            "dislike": -1
        }
    },{
        '$set': {modifiedOn: time.now()}
    }]}
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, decrease).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  deletelike
module.exports = {
    getAllIssues: getAllIssues,
    getAllIssuesPaginate: getAllIssuesPaginate,
    getSingleIssue: getSingleIssue,
    deleteIssue: deleteIssue,
    createIssue: createIssue,
    editTitle: editTitle,
    addAssignee: addAssignee,
    editDescription: editDescription,
    deleteAssignee: deleteAssignee,
    addWatcher: addWatcher,
    deleteWatcher: deleteWatcher,
    addlike: addlike,
    deletelike: deletelike,
    adddislike: adddislike,
    deletedislike: deletedislike
}