var multer = require('multer');
const time = require('../libs/timeLib');
var storing = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'tempUploads/');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname);
    }
});

var upload = multer({storage:storing}).single("demo[]");

module.exports = {
    upload: upload
}