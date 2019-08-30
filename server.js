
const express = require('express');
const userRoutes = require('./users/userRouter')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(request, response, next) {
  const method = request.method
  console.log(method)
  console.log (request.url)
  console.log(response)
  console.log(Date.now())
  next()
};

server.use('/users', userRoutes)
// server.use(logger)

module.exports = server;
