const randomString = function (length) {
  var userId = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    userId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return userId;
};





function openGallery(e, Gid) {
    e.preventDefault()
    location.href = `galleryView.html?gid=${Gid}`
}
