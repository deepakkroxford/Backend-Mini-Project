const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

/*
fist we have to setup the disk storage -> we dont need to remember this thing  it is already available on multer 
website just copy and paste and we should know how to work with that particular function.
->then we have to set the upload
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // here we have to specify the destination where we want to store the file
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
     crypto.randomBytes(12,function(err,name){
        const fn =  name+path.extname(file.originalname);
     })
      cb(null, fn);
    }
  })
  
  const upload = multer({ storage: storage })