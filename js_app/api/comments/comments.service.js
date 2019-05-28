const client = require('./comments.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const commentFormat = require('../../utils/formats').comments;
const usersModel = require('../users/users.service');
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const comment = client.getComment;

const userComments = async ({comments, value}) => {
  const user = await usersModel.user(value);
  const filter = {
    value: user.email,
    field: 'email'
  };
  return comments.filter(filterByValue(filter, commentFormat))
};

const allComments = async ({field, value}) => {
  const comments = await client.getAllComments();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: BAD_FORMAT};

  if (field === 'userId') return userComments({comments, value});

  if (field && value && !findValueByKeyInObject(commentFormat, field))
    throw {error: 'The property you are looking for does not exist in this resourse', code: BAD_FORMAT};

  const byFieldValue = filterByValue({field, value}, commentFormat);

  if (byFieldValue) {
    const response = comments.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: NOT_FOUND};
    return response

  } else {
    return  comments
  }
};

module.exports = {comment, allComments};