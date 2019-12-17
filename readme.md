## Start the server
> node index.js
> npm run dev

## GitHub and Heroku
> git push heroku master

## module.exports vs exports
https://www.freecodecamp.org/news/node-js-module-exports-vs-exports-ec7e254d63ac/
https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js


## Responses / contract

### signUpController - If username or password is not provided
  if(!username || !password) {
    return res.status(422).send({ error: 'You must provide a username and a password' });
  }

### signUpController - If the username provided does already exist
  if(existingUserName) {
    return res.status(422).send({ error: 'The given username is in use' });
  }

### signUpController - If signup is successful
  return res.json({
    userId: user.id,
    date: user.date,
    username: user.username,
    email: user.email,
    token: shared.createJWTForUser(user)
  });

### signInController - If username and password matches
  res.send({
    userId: req.user.id,
    date: req.user.date,
    username: req.user.username,
    email: req.user.email,
    token: shared.createJWTForUser(req.user)
  });

### signInController - If username and/or password is not found/incorrect
the Passport library will send:
Unauthorized

### usersController - queries all the usernames
[
  {
    "date": "2019-12-17T18:12:25.000Z",
    "username": "aaaa"
  }
]

### usersController - if query fails
{ error: 'Database query error'}
