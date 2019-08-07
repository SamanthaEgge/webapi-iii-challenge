const express = require('express');

const router = express.Router();
const db = require('./userDb')

//// GET Routes for users
router.get('/', (request, response) => {

});

router.get('/:id', (request, response) => {

});

router.get('/:id/posts', (request, response) => {

});

router.post('/', (request, response) => {

});

router.post('/:id/posts', (request, response) => {

});

router.delete('/:id', (request, response) => {

});

router.put('/:id', (request, response) => {

});

//custom middleware

function validateUserId(request, response, next) {

};

function validateUser(request, response, next) {

};

function validatePost(request, response, next) {

};

module.exports = router;
