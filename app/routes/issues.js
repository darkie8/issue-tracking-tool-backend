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
    app.get(`${baseUrl}/:issueId`,auth.isAuthenticated, issueController.getSingleIssue)
    app.get(`${baseUrl}/paginateIssues`,auth.isAuthenticated, issueController.getAllIssuesPaginate)
    app.post(`${baseUrl}/createIssue`, issueController.createIssue);
    app.post(`${baseUrl}/:issueId/addAssignee`,auth.isAuthenticated, issueController.addAssignee);
    app.post(`${baseUrl}/:issueId/deleteAssignee`,auth.isAuthenticated, issueController.deleteAssignee);
    app.post(`${baseUrl}/:issueId/addWatcher`,auth.isAuthenticated, issueController.addWatcher);
    app.post(`${baseUrl}/:issueId/deleteWatcher`,auth.isAuthenticated, issueController.deleteWatcher);
    app.post(`${baseUrl}/:issueId/addlike`,auth.isAuthenticated, issueController.addlike);
    app.post(`${baseUrl}/:issueId/deletelike`,auth.isAuthenticated, issueController.deletelike);
    app.post(`${baseUrl}/:issueId/adddislike`,auth.isAuthenticated, issueController.adddislike);
    app.post(`${baseUrl}/:issueId/deletedislike`,auth.isAuthenticated, issueController.deletedislike);
    app.put(`${baseUrl}/:issueId/editTitle`, issueController.editTitle);
    app.put(`${baseUrl}/:issueId/editDescription`, issueController.editDescription);
    app.post(`${baseUrl}/:issueId/delete`, issueController.deleteIssue);
    app.post(`${baseUrl}/upload`,[auth.isAuthenticated,upload.upload], uploadcontroller.uploadFiles);
}
