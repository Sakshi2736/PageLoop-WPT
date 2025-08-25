const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Specify where to store the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // File size limit (10MB)
}).fields([
    { name: 'cover', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }    // Expect 'pdf' field in the form with a max count of 1 file
]);

module.exports = upload;

