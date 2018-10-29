const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./checkLib')
let loggererr = ''
let msg = []
let crudCallback = (err, result, res, function1) => {
    if (function1 == 'getAllUser') {
        loggererr = 'getAllUser'
        msg = ['Failed To get users details', 'No User Found', 'Users details found']

    } else if (function1 == 'allModerators') {
        loggererr = 'allModerators'
        msg = ['Failed To get moderators details', 'No moderator Found', 'Moderator details found']

    } else if (function1 == 'getSingleModerator') {
        loggererr = 'getSingleModerators'
        msg = ['Failed To get Moderator details', 'No Moderator Found', 'Moderator details found']
    } else if (function1 == 'getSingleUser') {
        loggererr = 'getSingleUser'
        msg = ['Failed To get user details', 'No User Found', 'User details found']
    } else if (function1 == 'deleteUser') {
        loggererr = 'deleteUser'
        msg = ['Failed To delete user', 'No User Found', 'User details deleted']
    } else if (function1 == 'editAcountactivation') {
        loggererr = 'editAcountactivation'
        msg = ['Failed To verify User', 'No User Found', 'User details verified']
    } else if (function1 == 'editUser') {
        loggererr = 'editUser'
        msg = ['Failed To edit User', 'No User Found', 'User details edited']
    } else if (function1 == 'getAllRoom') {
        loggererr = 'getAllRoom'
        msg = ['Failed To get rooms details', 'No Room Found', 'Rooms details found']

    } else if (function1 == 'getSingleRoom') {
        loggererr = 'getSingleRoom'
        msg = ['Failed To get room details', 'No room Found', 'Room details found']
    } else {
        return
    }

    if (err) {
        console.log(err)
        logger.error(msg[0], `User Controller: ${loggererr}`, 10)
        let apiResponse = response.generate(true, msg[0], 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        logger.error(msg[1], `User Controller: ${loggererr}`, 10)
        let apiResponse = response.generate(true, msg[1], 404, null)
        res.send(apiResponse)

    } else {
        logger.info(msg[2], `User Controller: ${loggererr}`, 10)
        let apiResponse = response.generate(false, msg[2], 200, result)
        res.send(apiResponse)
    }
}

module.exports = {
    crudCallback: crudCallback
}