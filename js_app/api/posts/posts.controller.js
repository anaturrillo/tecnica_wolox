const {post, allPosts} = require('./posts.service');

const getPost = (req) => post(req.params.id);

const getAllPosts = async (req) => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allPosts({field, value})
};

module.exports = {getAllPosts, getPost};