const express = require('express');
const router = express.Router();
const issueController = require("./../../app/controllers/issueController");
const uploadcontroller = require('./../controllers/uploadingfilecontroller')
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const upload = require('./../middlewares/multerMiddleware')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/issue`;
    app.get(`${baseUrl}/allissues`, auth.isAuthenticated, issueController.getAllIssues)
    app.get(`${baseUrl}/getIssuesAssignedByaCertainUser/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedByaCertainUser)
    app.get(`${baseUrl}/getIssuesAssignedToaCertainUser/:authToken`, auth.isAuthenticated, issueController.getIssuesAssignedToaCertainUser)
    app.get(`${baseUrl}/:issueId/:authToken`,auth.isAuthenticated, issueController.getSingleIssue)
    app.get(`${baseUrl}/paginateIssues/:paginatingTime/:authToken`,auth.isAuthenticated, issueController.getAllIssuesPaginate)
    app.post(`${baseUrl}/createIssue/:authToken`,auth.isAuthenticated, issueController.createIssue);
    app.post(`${baseUrl}/:issueId/addAssignee/:authToken`,auth.isAuthenticated, issueController.addAssignee);
    app.post(`${baseUrl}/:issueId/deleteAssignee/:authToken`,auth.isAuthenticated, issueController.deleteAssignee);
    app.post(`${baseUrl}/:issueId/addWatcher/:authToken`,auth.isAuthenticated, issueController.addWatcher);
    app.post(`${baseUrl}/:issueId/deleteWatcher/:authToken`,auth.isAuthenticated, issueController.deleteWatcher);
    app.post(`${baseUrl}/:issueId/addlike/:authToken`,auth.isAuthenticated, issueController.addlike);
    app.post(`${baseUrl}/:issueId/deletelike`,auth.isAuthenticated, issueController.deletelike);
    app.post(`${baseUrl}/:issueId/adddislike/:authToken`,auth.isAuthenticated, issueController.adddislike);
    app.post(`${baseUrl}/:issueId/deletedislike/:authToken`,auth.isAuthenticated, issueController.deletedislike);
    app.put(`${baseUrl}/:issueId/editTitle/:authToken`, issueController.editTitle);
    app.put(`${baseUrl}/:issueId/editDescription/:authToken`, issueController.editDescription);
    app.post(`${baseUrl}/:issueId/delete/:authToken`, issueController.deleteIssue);
    app.post(`${baseUrl}/upload/:authToken`,[auth.isAuthenticated,upload.upload], uploadcontroller.uploadFiles);
}
