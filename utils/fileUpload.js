const multer=require('multer');

// Define file storage
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "uploads");
     },
     filename: function (req, file, cb) {
       cb(
         null,
         new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        
       ); // 22/12/2022  27:12:2022
       // new date ke Iso te convert korle date er formality 22/2/23 emn hoy.
     },
   });
   
   // Specify file format that can be saved
   function fileFilter(req, file, cb) {
     if (
       file.mimetype === "image/png" ||
       file.mimetype === "image/jpg" ||
       file.mimetype === "image/jpeg"
     ) {
       cb(null, true);
     } else {
       cb(null, false);
     }
   }
   
   const upload = multer({ storage, fileFilter });
   
   
   
   module.exports = { upload };