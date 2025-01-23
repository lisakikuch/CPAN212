import http from "http";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname('part2_bookstore');

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        if (req.method === 'GET') {
            let welcomePath = path.join(__dirname, 'pages', 'welcome.html');
            let welcome = fs.readFileSync(welcomePath);
            res.end(welcome);
        }
    } else if (req.url === '/about') {
        if (req.method === 'GET') {
            let homePath = path.join(__dirname, 'pages', 'home.html');
            let home = fs.readFileSync(homePath);
            res.end(home);
            // console.log(req);
        }
    } else if (req.url === '/contact') {
        if (req.method === 'GET') {
            let contactPath = path.join(__dirname, 'pages', 'contact.html');
            let contact = fs.readFileSync(contactPath);
            res.end(contact);
        }
    } else if (req.url === '/login') {
        if (req.method === 'GET') {
            let loginPath = path.join(__dirname, 'pages', 'login.html');
            let login = fs.readFileSync(loginPath);
            res.end(login);
        }
    } else if (req.url === '/register') {
        if (req.method === 'GET') {
            let registertPath = path.join(__dirname, 'pages', 'register.html');
            let register = fs.readFileSync(registertPath);
            res.end(register);
        }
    } else {
        if (req.method === 'GET') {
            let notFoundtPath = path.join(__dirname, 'pages', 'not-found.html');
            let notFound = fs.readFileSync(notFoundtPath);
            res.end(notFound);
        }
    }
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});