const client = require('./posts.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const postsFormat = require('../../utils/formats').post;
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const post = client.getPost;

const allPosts = async ({field, value}) => {
  const posts = await client.getAllPosts();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: BAD_FORMAT};

  if (field && value && !findValueByKeyInObject(postsFormat, field))
    throw {error: 'The property you are looking for does not exist in this resourse', code: BAD_FORMAT};

  const byFieldValue = filterByValue({field, value}, postsFormat);

  if (byFieldValue) {
    const response = posts.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: NOT_FOUND};
    return response

  } else {
    return  posts
  }
};

module.exports = {post, allPosts};