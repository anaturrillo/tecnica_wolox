const users = require('./users/users.routes');
const photos = require('./photos/photos.routes');
const albums = require('./albums/albums.routes');
const posts = require('./posts/posts.routes');
const comments = require('./comments/comments.routes');
const sharedAlbums = require('./sharedAlbums/sharedAlbums.routes');

module.exports = {users, photos, albums, posts, comments, sharedAlbums};