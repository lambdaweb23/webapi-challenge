const express = require("express");
const projectRouter = require("./Routes/projectRouter.js");
const actionRouter = require("./Routes/actionRouter.js");

const server = express();
server.use(express.json());
server.use(Logger);

server.use("/api/projects", projectRouter);
server.use("/api/projects", actionRouter);

function Logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url}
      )}`
    );

    next();
}

module.exports = server;