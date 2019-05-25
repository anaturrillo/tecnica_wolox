const client = require('./users.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const usersFormat = require('../../utils/formats').user;

const user = client.getUser;

const allUsers = async ({field, value}) => {
  const comments = await client.getAllUsers();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: 'bad_format'};

  if (field && value && !findValueByKeyInObject(usersFormat, field)) throw {error: 'The property you are looking for does not exist in this resourse', code: 'bad_format'};

  const byFieldValue = filterByValue({field, value}, usersFormat);

  if (byFieldValue) {
    const response = comments.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: 'not_found'};
    return response

  } else {
    return  comments
  }
};

module.exports = {user, allUsers};