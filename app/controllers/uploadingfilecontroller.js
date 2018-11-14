
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const path = require('path');

// models 
const IssueModel = mongoose.model('Issue_3')


let uploadFiles = (req, res) => {
    

       try{ logger.info('Success in retrieving data', 'uoloadingfilecontroller: uploadFiles()', 5);

        let apiResponse = response.generate(
            false,
            'Success in uploading',
            200, {
                originalname: req.file.originalname,
                uploadname: req.file.filename
            })
        res.send(apiResponse)}
    catch (e) {
        logger.error('Failed To Retrieve User Data', 'uoloadingfilecontroller: uploadFiles()', 10)
        let apiResponse = response.generate(true, 'failed to upload', 501, 'error')
        res.send(apiResponse)
    }
}



module.exports = {
    uploadFiles: uploadFiles
}