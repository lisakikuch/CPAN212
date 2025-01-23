// const math = require("./06-math");
// const { addition, division, multiplication, substraction } = require("./06-math");

// console.log(math.addition(1, 1));
// console.log(math.substraction(2, 1));
// console.log(math.multiplication(3, 3));
// console.log(math.division(8, 4));

// console.log(addition(1, 1));
// console.log(substraction(2, 1));
// console.log(multiplication(3, 3));
// console.log(division(8, 4));

// Create a server
const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World!");
        res.end();
    }
    else if (req.url === "/login") {
        res.write("login");
        res.end();
    }
    else if (req.url === "/register") {
        res.write("register");
        res.end();
    }
    else if (req.url === "/logout") {
        res.write("logout");
        res.end();
    }
    else {
        res.write("page not found");
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
});