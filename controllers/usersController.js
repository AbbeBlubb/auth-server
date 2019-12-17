const User = require('../models/User');


module.exports = function usersController(req, res) {
  //console.log('rootController.js ', req.headers);

  // Empty object will find all
  const filter = {};
  // Include all you want or all you don't want. _id is always sent, add - to omit
  const projection = 'username date -_id';
  // Sort by the field of date, descending (from largest to lowest)
  const options = {sort: { date: -1 }};
  const callback = function(err, value) {
    if (err) {
      res.send({ error: 'Database query error'});
    } else {
      res.send(value);
    }
  };

  User.find(
    filter,
    projection,
    options,
    callback
  );

  //res.send({ data: 'Here comes all the data in one array' });
};
