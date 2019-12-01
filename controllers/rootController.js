module.exports = function rootController(req, res) {
  console.log('rootController.js ', req.headers);
  res.send({ hi: 'there' });
};
