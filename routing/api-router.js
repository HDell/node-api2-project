//set up
const express = require('express');
const router = express.Router();
const postsRouter = require('./posts-router.js');
//middleware
router.use('/posts', postsRouter);
//export
module.exports = router;