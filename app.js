import express from 'express';

import cors from 'cors';
// CORS stands for Cross Origin Resource Sharing and establishes the rules by which resources
// can be shared across domains (origins)

//import controller
import HelloController from "./controllers/hello-controller.js";

import UserController from "./controllers/users/users-controller.js";

import TuitsController
    from "./controllers/tuits/tuits-controller.js";

// const express = require('express')
const app = express();

// configure cors right after instantiating express
app.use(cors())

// parse JSON from HTTP request body
app.use(express.json());

//NOTE: Express defines a JSON middleware to parse data from the body that can be registered as a middleware.
// All requests will first go through this middleware parsing the HTTP body into a JSON object added to the request
// object in a new body property that later HTTP handlers can access.


// Instead of defining the http endpoints here, define them in the hello-controller.js file
// app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

// handling requests for hello greeting from controller
HelloController(app);
UserController(app); //pass it app
TuitsController(app);


// app.listen(4000)
app.listen(process.env.PORT || 4000);
// we can't use port 4000 when running on Heroku.
// Instead Heroku declares the proper port to use in an environment variable called PORT available from Node using process.env.PORT