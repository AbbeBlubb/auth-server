module.exports = function rootController(req, res) {
  console.log('rootController.js ', req.headers);
  res.send({ data: 'Here comes all the data in an array' });
};
