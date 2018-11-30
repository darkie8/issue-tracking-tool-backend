const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/auth');

const commentController = require('./../controllers/commentController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/comment`;
    app.get(`${baseUrl}/singleComment/:commentId`, auth.isAuthenticated, commentController.getSingleComment )
}