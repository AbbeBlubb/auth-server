module.exports = function pingController(req, res, next) {
    // request, response, next will be used for error handling
    res.send('pong');
};
