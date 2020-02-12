//set up
const express = require('express');
const server = express();
const apiRouter = require('./routing/api-router.js');
//port
const port = 5000;
//middleware
server.use(express.json());
server.use('/api',apiRouter);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});