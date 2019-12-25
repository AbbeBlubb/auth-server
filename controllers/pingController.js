module.exports = function pingController(req, res, next) {
    // request, response, next will be used for error handling
    // A JSON text is a serialized object or array. res.send doesn't convert non-objects or non-arrays to JSON.
    // res.json converts also not valid JSON, like strings, null, undefined
    res.json('pong');
};
