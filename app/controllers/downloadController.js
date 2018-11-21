const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');

let downloadfiles = (req,res) => {
    try{ logger.info('Success in retrieving data', 'uoloadingfilecontroller: uploadFiles()', 5);

        let apiResponse = response.generate(
            false,
            'Success in downloading',
            200, {
                dirPath: req.body.filePath 
            })
        res.send( apiResponse )}
    catch (e) {
        logger.error('Failed To Retrieve User Data', 'downloadController: downloadfiles()', 10)
        let apiResponse = response.generate(true, 'failed to download', 501, 'error')
        res.send(apiResponse)
    }
}
module.exports = {
    downloadController: downloadfiles
}