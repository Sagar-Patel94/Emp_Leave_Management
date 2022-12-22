import multer from "multer";

let fname, uploadPath: any;
const strg = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      fname = `${Date.now()}.png`;
      cb(null, fname);
    } else if (file.mimetype === "application/pdf") {
      fname = `${Date.now()}.pdf`;
      cb(null, fname);
    } else {
      fname = file.originalname;
      cb(null, fname);
    }
  },
});

const uploadFiles = multer({
    storage: strg,
    fileFilter(req, file, cb) {
    req.body.image = false;
    req.body.document = false;
    req.body.others = false;
    if (
      file.originalname.match(/\.(jpg)$/) ||
      file.originalname.match(/\.(png)$/) ||
      file.originalname.match(/\.(jpeg)$/)
    ) {
      req.body.image = true;
      uploadPath = "public/profilePhotos/";
      req.body.filePath = uploadPath;
      cb(null, req.body);
    } else if (
      file.originalname.match(/\.(pdf)$/)
    ) {
      req.body.document = true;
      uploadPath = "public/documents/";
      req.body.filePath = uploadPath;
      cb(null, req.body);
    } else {
      req.body.others = true;
      uploadPath = "public/others/";
      req.body.filePath = uploadPath;
      cb(null, req.body);
    }
  },
});

let fileUpload = uploadFiles.array("files");

export default fileUpload;
