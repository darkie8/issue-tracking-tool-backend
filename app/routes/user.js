const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
    app.post(`${baseUrl}/signup`, userController.signUpFunction);
    app.post(`${baseUrl}/login`, userController.loginFunction);
    app.put(`${baseUrl}/:userId/verify`, userController.editAcountactivation);
    app.post(`${baseUrl}/:userId/delete`, userController.deleteUser);
}
