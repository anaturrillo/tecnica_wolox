const {comment, allComments} = require('./comments.model');

const getComment = (req) => comment(req.params.id);

const getAllComments= async (req) => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allComments({field, value})
};

module.exports = {getAllComments, getComment};