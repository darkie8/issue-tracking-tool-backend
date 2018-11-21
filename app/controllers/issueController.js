const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const callback = require('./../libs/controllerCallbackLib');
const check = require('../libs/checkLib');
const fse = require('fs-extra');
// models
const UserModel = mongoose.model('User_1')
const IssueModel = mongoose.model('Issue_4')

let getAllIssues = (req, res) => {
    IssueModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getAllIssues')
        })
} // end get all issues

let getAllIssuesPaginate = (req, res) => {
    let paginatingTime = new Number(req.params.paginatingTime)
    let limit = new Number(req.header('limit'))
    console.log(req.header('limit'));
    IssueModel.find().skip(paginatingTime).limit(limit)
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

// get Issues Assigned By a Certain User
let getIssuesAssignedByaCertainUser = (req, res) => {
    IssueModel.find({
            reporter: req.user.userId
        })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error('Failed To get Issue details', `User Controller: getIssuesAssignedByaCertainUser`, 10)

                let apiResponse = response.generate(true, 'Failed To get Issue details', 500, {
                    'issues': null,
                    '_length': 0
                })
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.error('Issue details found', `User Controller: getIssuesAssignedByaCertainUser`, 8)
                let apiResponse = response.generate(true, 'No issue Found', 404, {
                    'issues': null,
                    '_length': 0
                })
                res.send(apiResponse)

            } else {
                let total_issues = result.length
                logger.info('Issue details found', `User Controller: getIssuesAssignedByaCertainUser`, 1)
                let apiResponse = response.generate(false, 'Issue details found', 200, {
                    'issues': result,
                    '_length': total_issues
                })
                res.send(apiResponse)
            }
        })
} // end getIssuesAssignedByaCertainUser

let getIssuesAssignedByaCertainUserPaginate = (req, res) => {
    let paginatingTime = new Number(req.params.paginatingTime)
    let limit = new Number(req.header('limit'))
    console.log(req.header('limit'));
    IssueModel.find({
        reporter: req.user.userId
    }).skip(paginatingTime).limit(limit)
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getAllIssues')
        })
} // end getIssuesAssignedByaCertainUser Paginate

// get Issues Assigned to a Certain User
let getIssuesAssignedToaCertainUser = (req, res) => {
    IssueModel.find({
            assigned_personel: [ req.user.userId]
        })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error('Failed To get Issue details', `User Controller: getIssuesAssignedByaCertainUser`, 10)

                let apiResponse = response.generate(true, 'Failed To get Issue details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.error('Issue details found', `User Controller: getIssuesAssignedByaCertainUser`, 8)
                let apiResponse = response.generate(true, 'No issue Found', 404, null)
                res.send(apiResponse)

            } else {
                let total_issues = result.length
                logger.info('Issue details found', `User Controller: getIssuesAssignedByaCertainUser`, 1)

                let apiResponse = response.generate(false, 'Issue details found', 200, {
                    'issues': result,
                    '_length': total_issues
                })
                res.send(apiResponse)
            }
        })
} // end getIssuesAssignedToaCertainUser

let getIssuesAssignedToaCertainUserPaginate = (req, res) => {
    let paginatingTime = new Number(req.params.paginatingTime)
    let limit = new Number(req.params.limit)
    console.log(req.header('limit'));
    IssueModel.find({
        assigned_personel: [ req.user.userId]
    }).skip(paginatingTime).limit(limit)
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            callback.crudCallback(err, result, res, 'getAllIssues')
        })
} // end getIssuesAssignedToaCertainUser Paginate

let deleteIssue = (req, res) => {

    IssueModel.findOneAndRemove({
        'issueId': req.body.issueId
    }).exec((err, result) => {
        callback.crudCallback(err, result, res, 'deleteIssue')
    }); // end user model find and remove


} // end delete user




let createIssue = (req, res) => {

    var tags = req.body.tags.split(',')
    var fileswthtdir = req.body.files.split(',');
    

    if (req.body.imagefolder) {
let issueId = shortid.generate();

let files = fileswthtdir.map(file => `uploads/${issueId}/${file}`);
// creating issue
let issue = new IssueModel({
    issueId: issueId,
    title: req.body.title,
    tags: tags,
    description: req.body.description,
    reporter: req.user.userId,
    createdOn: time.now(),
    modifiedOn: time.now(),
    files: files
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
        // moving the files to the upload folder
        for (let file of fileswthtdir) {
            let srcpath = `${req.body.imagefolder}/${file}`;
            let dstpath = `uploads/${issueId}/${file}`
            fse.move(srcpath, dstpath)
                .then(() => {
                    console.log('success moving the file!')
                    // removing the temporary folder 
                    fse.remove(`${req.body.imagefolder}`)
                        .then(() => {
                            console.log('success removing!')
                        })
                        .catch(err => {
                            console.error(err)
                        })

                })
                .catch(err => {
                    console.error(err)
                })
        };
    }
})

        

    } else {
        let issueId = shortid.generate();
        let files = []
        // if there is no upload of images
        let issue1 = new IssueModel({
            issueId: issueId,
            title: req.body.title,
            tags: tags,
            description: req.body.description,
            reporter: req.user.userId,
            createdOn: time.now(),
            modifiedOn: time.now(),
            files: files
        })

        issue1.save((err, newIssue) => {
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
    }



} // end creating issue


let editTitle = (req, res) => {
    let option = {
        title: req.body.title,
        '$set': {
            modifiedOn: time.now()
        }
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
        '$set': {
            modifiedOn: time.now()
        }
    }

    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, option).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // end editTitle

let editTags = (req, res) => {
    console.log(req.body)
    let tags = req.body.tags.split(',');
    let option = {

        tags: [...tags],
        '$set': {
            modifiedOn: time.now()
        }
    }

    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, option).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editUser')
    })
} // end editTitle
let addAssignee = (req, res) => {
    let push = {
        'modifiedOn': time.now(),
        '$push': {
            "assigned_personel": req.body.assigneeId
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, push).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addAssignee

let deleteAssignee = (req, res) => {
    let pull = {
        modifiedOn: time.now(),
        '$pull': {
            "assigned_personel": req.body.assigneeId
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, pull).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // delete  addAssignee
let addWatcher = (req, res) => {
    let push = {
        modifiedOn: time.now(),
        '$push': {
            "watcher": req.body.watcherId
        }
    }

    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, push).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addWatcher 
let deleteWatcher = (req, res) => {
    let pull = {
        modifiedOn: time.now(),
        '$pull': {
            "watcher": req.body.watcherId
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, pull).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })
} // delete  addAssignee

let addlike = (req, res) => {
    let increase = {
        modifiedOn: time.now(),
        '$inc': {
            "like": 1
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addlike 
let deletelike = (req, res) => {
    let decrease = {
        modifiedOn: time.now(),
        '$inc': {
            "like": -1
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, decrease).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  deletelike

let adddislike = (req, res) => {
    let increase = {
        modifiedOn: time.now(),
        '$inc': {
            "dislike": 1
        }
    }
    IssueModel.findOneAndUpdate({
        'issueId': req.params.issueId
    }, increase).exec((err, result) => {
        callback.crudCallback(err, result, res, 'editTitleandDescription')
    })

} // end  addlike 
let deletedislike = (req, res) => {
    let decrease = {
        modifiedOn: time.now(),
        '$inc': {
            "dislike": -1
        }
    }
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
    deletedislike: deletedislike,
    getIssuesAssignedByaCertainUser: getIssuesAssignedByaCertainUser,
    getIssuesAssignedToaCertainUser: getIssuesAssignedToaCertainUser,
    getIssuesAssignedByaCertainUserPaginate: getIssuesAssignedByaCertainUserPaginate,
    getIssuesAssignedToaCertainUserPaginate: getIssuesAssignedToaCertainUserPaginate,
    editTags: editTags
}