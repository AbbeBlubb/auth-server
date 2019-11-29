module.exports = function root(req, res, next) {
    // request, response, next will be used for error handling
    res.send(['Elvis', 'Jacko']);
};
