import express from "express"; // if you are using type: module
// const express = require("express"); // if using common JS (Default)

import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
// Web browsers prevent requests accesses from different domains by default
// allows Cross-Origin Resource Sharing
app.use(cors());
// Parses incoming requests with URL-encoded payloads
// Parses the form data and makes it available in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // extracts application/json data, OLD method was bodyparser
// AI tools like to suggest bodyparser but avoid it because it needs another package to be installed
// Use the express build-in funcation

// routes
app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

// send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Lisa",
        lname: "Kikuchi"
    };
    res.send(data);
});

app.post("/login", (req, res) => {
    console.log(req.body);
    // Process with DB in future
    res.send("I stole your data");
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});