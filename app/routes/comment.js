const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');

const commentController = require('./../controllers/commentController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/comment`;
    app.get(`${baseUrl}/singleComment/:commentId`, auth.isAuthenticated, commentController.getSingleComment)

    // like and dislike handler route
    app.post(`${baseUrl}/:commentId/addlike/:authToken`, auth.isAuthenticated, commentController.addlike);
    app.post(`${baseUrl}/:commentId/deletelike/:authToken`, auth.isAuthenticated, commentController.deletelike);
    app.post(`${baseUrl}/:commentId/adddislike/:authToken`, auth.isAuthenticated, commentController.adddislike);
    app.post(`${baseUrl}/:commentId/deletedislike/:authToken`, auth.isAuthenticated, commentController.deletedislike);

}