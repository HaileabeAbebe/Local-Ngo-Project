import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(
        new Error("Invalid file type. Only PDF and Word documents are allowed.")
      );
    } else {
      cb(null, true);
    }
  },
});

export default upload;
