const uploader = require("../../utilities/singleFileUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpge", "image/jpg", "image/png"],
    1000000,
    "only .jpg, jpge or .png files are allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
