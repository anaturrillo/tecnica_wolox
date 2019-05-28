const {BAD_FORMAT, NOT_FOUND} = require('../utils/codes');

const httpStatus = {
  [NOT_FOUND]:404,
  [BAD_FORMAT]:400
};

module.exports = fn => (req, res) => Promise.all([fn(req)])
  .then(([result]) => {
    res.json(result)
  })
  .catch(error => {
    console.error(error);
    res.status(httpStatus[error.code] || (error && error.response && error.response.status) || 500);
    res.json({msg: error.message})
  });