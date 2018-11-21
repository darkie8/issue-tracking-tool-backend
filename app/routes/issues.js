const express = require('express');
const router = express.Router();
const issueController = require("./../../app/controllers/issueController");
const uploadcontroller = require('./../controllers/uploadingfilecontroller')
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const upload = require('./../middlewares/multerMiddleware')
const download = require('./../middlewares/download')
const downloadcallback = require('./../controllers/downloadController')
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/issue`;

    // get all issues
    app.get(`${baseUrl}/allissues`,auth.isAuthenticated, issueController.getAllIssues)

    // get paginated all ussues
    app.get(`${baseUrl}/paginateIssues/:paginatingTime/:authToken`,auth.isAuthenticated, issueController.getAllIssuesPaginate)

    // get issues assigned and reported
    app.get(`${baseUrl}/getIssuesAssignedByaCertainUser/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedByaCertainUser)
    app.get(`${baseUrl}/getIssuesAssignedToaCertainUser/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedToaCertainUser),

    // get  paginated issues assigned and reported respectively
    app.get(`${baseUrl}/getIssuesAssignedByaCertainUserPaginate/:paginatingTime/:limit/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedByaCertainUserPaginate)
    app.get(`${baseUrl}/getIssuesAssignedToaCertainUserPaginate/:paginatingTime/:limit/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedToaCertainUserPaginate)

    // get single issue
    app.get(`${baseUrl}/:issueId/:authToken`,auth.isAuthenticated, issueController.getSingleIssue)

    // creating issues
    app.post(`${baseUrl}/createIssue/:authToken`,auth.isAuthenticated, issueController.createIssue);

    // editing fields
    app.post(`${baseUrl}/:issueId/addAssignee/:authToken`,auth.isAuthenticated, issueController.addAssignee);
    app.post(`${baseUrl}/:issueId/deleteAssignee/:authToken`,auth.isAuthenticated, issueController.deleteAssignee);
    app.post(`${baseUrl}/:issueId/addWatcher/:authToken`,auth.isAuthenticated, issueController.addWatcher);
    app.post(`${baseUrl}/:issueId/deleteWatcher/:authToken`,auth.isAuthenticated, issueController.deleteWatcher);
    app.post(`${baseUrl}/:issueId/addlike/:authToken`,auth.isAuthenticated, issueController.addlike);
    app.post(`${baseUrl}/:issueId/deletelike`,auth.isAuthenticated, issueController.deletelike);
    app.post(`${baseUrl}/:issueId/adddislike/:authToken`,auth.isAuthenticated, issueController.adddislike);
    app.post(`${baseUrl}/:issueId/deletedislike/:authToken`,auth.isAuthenticated, issueController.deletedislike);
    app.put(`${baseUrl}/:issueId/editTitle/:authToken`,auth.isAuthenticated, issueController.editTitle);
    app.put(`${baseUrl}/:issueId/editDescription/:authToken`,auth.isAuthenticated, issueController.editDescription);
    app.put(`${baseUrl}/:issueId/editTags/:authToken`,auth.isAuthenticated, issueController.editTags);

    // deleting issues
    app.post(`${baseUrl}/:issueId/delete/:authToken`, issueController.deleteIssue);

    // uploading images
    app.post(`${baseUrl}/upload/:authToken`,[auth.isAuthenticated,upload.upload], uploadcontroller.uploadFiles);

    // download images
    app.post(`${baseUrl}/download/:authToken`,[auth.isAuthenticated,download.downloadIssueFiles], downloadcallback.downloadController)
}
