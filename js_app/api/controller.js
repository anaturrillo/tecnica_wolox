const httpStatus = {
  'not_found':404,
  'bad_format':400
};

module.exports = fn => (req, res) => fn(req)
  .then(result => {
    res.json(result)
  })
  .catch(error => {
    console.error(error);
    res.status(httpStatus[error.code] || 500);
    res.json({msg: error.message})
  });