const express = require('express');

const router = express.Router();
const db = require('./postDb')

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//////
// router.post('/:id/posts', (request, response) => {

// });



// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;