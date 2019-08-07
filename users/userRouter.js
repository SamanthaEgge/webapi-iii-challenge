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
router.get('/:id', validateUser, (request, response) => {
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

router.get('/:id/posts', (request, response) => {
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

router.post('/', (request, response) => {
  const newUser = request.body
  console.log(newUser)

  if (newUser) {
    db.insert(newUser)
    .then(user => {
      console.log(user)
      response.status(202).json(user)
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error accessing the server'})
    })
    })
  } else {
    response.status(400).json({ message: 'Please enter a name when creating a new user'})
  }
});


    //// Probably belongs in postRouter ???
// router.post('/:id/posts', (request, response) => {

// });

router.delete('/:id', (request, response) => {
  const id = request.params.id
  db.getById(id)
    .then(user => {
      if (id) {
        console.log(user)
        db.remove(id)
          .then(user => {
            console.log(user)
            response.status(200).json({ message: `User with ${id} has been successfully deleted`})
          })
          .catch(error => {
            console.log(error)
            response.status(500).json({ message: 'Error reaching the server'})
          })
      } else {
        response.status(404).json({ message: 'This user does not exist'})
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error reaching the server' })
    })
});

router.put('/:id', (request, response) => {
  const id = request.params.id
  db.getById(id)
    .then(user => {
      if (id) {
        console.log(user)
        db.update(id)
          .then(user => {
            console.log(user)
            response.status(200).json({ message: `User with ${id} has been successfully updated`})
          })
          .catch(error => {
            console.log(error)
            response.status(500).json({ message: 'Error reaching the server'})
          })
      } else {
        response.status(404).json({ message: 'This user does not exist'})
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ message: 'Error reaching the server' })
    })
});


//custom middleware

function validateUserId(request, response, next) {

};

function validateUser(request, response, next) {

};

function validatePost(request, response, next) {

};

module.exports = router;
