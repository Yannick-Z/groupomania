const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/wwebm': 'webm',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { //Multer stock les images dans le dossier image
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        // const name = file.originalname.split(' ').join('_');
        
        let filename = Date.now()+"."+extension;
        callback(null, filename);

    }
});
module.exports = multer({ storage }).single('image');