
const express = require('express');
const userRoutes = require('./users/userRouter')

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(request, response, next) {
  console.log(request)
  console.log(response)
  console.log(Date.now())
  next()
};

server.use('/users', userRoutes)

module.exports = server;
