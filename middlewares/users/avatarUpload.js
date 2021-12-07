function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpge", "image/jpg", "image/png"],
    1000000,
    "only .jpg, jpge or .png files are allowed"
  );
}

module.exports = avatarUpload;
