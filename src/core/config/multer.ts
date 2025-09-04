import multer from "multer";
import path from "path";

// Configure disk storage
const storage = multer.diskStorage({
  // Defines the destination folder where uploaded files will be stored
  destination: (req, file, cb) => {
    // "src/config/" is the current directory of the executed script
    // path.resolve() creates an absolute path, preventing issues with relative paths
    // adjust my ../../uploads to my desired upload directory
    cb(null, path.resolve("src/config/", "../../uploads"));
  },

  // defines the filename for the uploaded file
  filename: (req, file, cb) => {
    // generate a unique filename to prevent collisions
    // date.now() for a timestamp, plus original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// create the Multer instance
const uploadCompanyImage = multer({
  storage: storage,
  // optional: Add file filtering (i.e, only images)
  fileFilter: (req, file, cb) => {
    const fileImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (fileImageTypes.includes(file.mimetype)) {
      cb(null, true); // accept the file
    } else {
      cb(null, false); // reject file
      const error = new Error(
        "Invalid file type. Only JPEG, PNG, and GIF are allowed."
      );
      console.log(error);
    }
  },
  // optional: set file size limits
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadCompanyImage;
