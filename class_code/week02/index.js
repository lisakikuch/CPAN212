// const http = require("http");

import http from "http";
// Add type: "module" to package.json if you want to use "import" instead of "require"

import fs from "fs";
// File System

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        let webpage = fs.readFileSync('homepage.html')
        res.end(webpage);
    } else if (req.url === '/about') {
        res.end("Welcome to about us");
    } else if (req.url === '/user/account/id') {
        res.end("My name is Lisa!");
    }
    else {
        res.end("Page Not Found :(");
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});

// https://www.ebay.ca/itm/1234

// domain: localhost:8000
// endpoint -> /itm
// id -> 1234