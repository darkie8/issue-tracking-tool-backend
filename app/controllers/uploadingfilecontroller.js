
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const path = require('path');
const mongoose = require('mongoose');
// models 
const IssueModel = mongoose.model('Issue_4');


let uploadFiles = (req, res) => {
    

       try{ logger.info('Success in retrieving data', 'uoloadingfilecontroller: uploadFiles()', 5);

        let apiResponse = response.generate(
            false,
            'Success in uploading',
            200, {
                dirPath: req.dirPath 
            })
        res.send( req.dirPath )}
    catch (e) {
        logger.error('Failed To Retrieve User Data', 'uoloadingfilecontroller: uploadFiles()', 10)
        let apiResponse = response.generate(true, 'failed to upload', 501, 'error')
        res.send(apiResponse)
    }
}



module.exports = {
    uploadFiles: uploadFiles
}