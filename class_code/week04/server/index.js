/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/

// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
const express = require("express"); // if using common JS (Default)

import express from 'express'
import logger from './middleware/logger.js';
import auth from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(logger); // This is application wide, so it runs everywhere

// middlelware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// routes
app.get("/", logger, (req, res) => {
    res.send("Welcome to our server");
});
// If you want to use a middleware in the specific route
// ("route", middleware, (req, res)...)

app.get("/about", logger, (req, res) => {
    res.send("Welcome to the about page");
});

app.get("/login", logger, (req, res) => {
    res.send("We have recieved your request - login");
});

app.post("/login", (req, res) => {
    res.send("We stole your information");
});

app.get("/fetchData", auth, (req, res) => {
    res.send("Hi Lisa, this is your profile page!");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});

// const PORT = 8000;
// const express = require("express");
// const app = express();

// const logger = (req, res, next) => {
//     const { test_validation } = req.query;
//     console.log(test_validation);
//     console.log(req.url);
//     console.log(Date.now());
//     next();
// }

// // middlelware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // routes
// app.get("/", (req, res) => {
//     res.send("Welcome to our server")
// })

// app.get("/route_test", logger, (req, res) => {
//     res.send("Welcome to our server")
// })


// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });

// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
// });