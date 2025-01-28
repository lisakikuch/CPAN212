import express from 'express';
// Task 2: Create a routes file and import it into the server
import lab_router from './routes/lab_router.js';

// Task 1: Create a new Express application server
const app = express();
const PORT = 8000;

app.use("/lab", lab_router);
// LH:8000/lab

app.get("/", (req, res)=>{
    res.send("Welcome to the server");
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})