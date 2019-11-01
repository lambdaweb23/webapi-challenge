const express = require('express');
const projectRouter = require('./routes/projectRouter.js');

const server = express();
server.use(express.json());

server.use('/api/projects', projectRouter);

server.listen(6000, () => console.log('server is listening on port 6000'));
