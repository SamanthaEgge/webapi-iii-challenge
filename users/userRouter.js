const express = require('express');

const router = express.Router();
const db = require('./userDb')

//// GET Routes for users
router.get('/', (request, response) => {
  db.get()
    .then(users => {
      response.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error getting list of the users'})
    })
})

/// needs middleware 
router.get('/:id', validateUserId, (request, response) => {
  const id = request.params.id

  db.getById(id)
    .then(user => {
      response.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error accessing the server to request user by id'})
    })
});

router.get('/:id/posts', validateUserId, (request, response) => {
  const id = request.params.id

  db.getUserPosts(id)
    .then(posts => {
      response.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error accessing the server to retrieve user posts' })
    })
});

router.post('/', validateUser, (request, response) => {
  const newUser = request.body
  console.log(newUser)

  db.insert(newUser)
  .then(user => {
    console.log(user)
    response.status(202).json(user)
  .catch(error => {
    console.log(error)
    response.status(500).json({ message: 'Error accessing the server'})
  })
    })
});


    //// Probably belongs in postRouter ???
// router.post('/:id/posts', (request, response) => {

// });

router.delete('/:id', validateUserId, (request, response) => {
  const id = request.params.id

  db.remove(id)
    .then(user => {
      console.log(user)
      response.status(200).json({ message: `User with ${id} has been successfully deleted`})
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error reaching the server'})
    })
});

router.put('/:id', validateUserId, (request, response) => {
  const id = request.params.id
  const updateName = request.body

  db.update(id, updateName)
    .then(user => {
      console.log(user)
      response.status(200).json({ message: `User with ${id} has been successfully updated`})
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error reaching the server'})
    })
});


//custom middleware

function validateUserId(request, response, next) {
  const id = request.params.id

  db.getById(id)
  .then(user => {
    if (user) {
      next()
    } else {
      response.status(404).json({ message: `There is no user at ${id}`})
    }
  })
  .catch(error => {
    console.log(error)
    response.status(500).json({ message: 'Error accessing the server'})
  })
};

function validateUser(request, response, next) {
  const newUser = request.body
  if (newUser) {
    console.log('Create user request contains name')
    next()
  } else {
    response.status(400).json({ message: 'Please enter a name when creating a new user'})
  }
};

function validatePost(request, response, next) {

};

module.exports = router;
