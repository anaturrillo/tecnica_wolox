const {user, allUsers} = require('./users.service');

const getUser = (req) => user(req.params.id);

const getAllUsers = async (req) => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allUsers({field, value})
};

module.exports = {getAllUsers, getUser};