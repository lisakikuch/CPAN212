// Task 2: Create a routes file and import it into the server
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the lab router!")
});

// Task 3: Create a route /name that renders your name
router.get("/name", (req, res) => {
    res.send("Lisa")
});

// Task 4: Create a route /greeting that renders your name and student number
router.get("/greeting", (req, res) => {
    res.send("Hello from Lisa - n01675386!")
});

// Task 5: Create route /add that accepts x and y as get params and returns the result
router.get("/add/:x/:y", (req, res) => {
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y)
    res.send(`${x + y}`);
});

// Task 6: Create a route /calculate that accepts a, b, and operation to perform (+, -, *, /, **)
router.get("/calculate/:a/:b/:operator", (req, res) => {
    let a = parseFloat(req.params.a);
    let b = parseFloat(req.params.b);
    let operator = req.params.operator;
    let result = 0;
    switch (operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if(b != 0) {
                result = a / b;
            } else {
                res.send("b cannot be 0")
                return;
            }
            result = a / b;
            break;
        case "**":
            result = a ** b;
            break;
        default:
            res.send("Operation not valid");
            return;
    }
    res.send(`${result}`);
})

export default router;