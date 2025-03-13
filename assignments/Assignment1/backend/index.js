import express from "express"; // if you are using type: module
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Route to upload photo
app.post("/uploadPhoto", upload.single('photo'), (req, res) => {
    res.json({ filePath: `uploads/${req.file.filename}` });
});

// Route to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.get("/", (req, res) => {
    res.send("Welcome to our server");
});

app.get("/getEdu", (req, res) => {
    res.json([
        { id: 1, school: "Humber Polytechnic", degree: "Diploma - Comuputer Programming", year: "Jan 2023 - current" },
        { id: 2, school: "Kanda University of International Study", degree: "Bachelor of Arts", year: "Apr 2012 - Mar 2016" }
    ]);
});

app.get("/getExp", (req, res) => {
    res.json([
        {
            "id": 1,
            "title": "Accounting Administrative Assistant",
            "company": "Rapyuta Robotics",
            "duration": "Jan 2022 - Jun 2022",
            "location": "Tokyo, Japan"
        },
        {
            "id": 2,
            "title": "Interpreter",
            "company": "MarketEnterprise Co., Ltd.",
            "duration": "Jan 2021 - Dec 2021",
            "location": "Tokyo, Japan",
        },
        {
            "id": 3,
            "title": "Sales Associate / Interpreter",
            "company": "YOSHINO GYPSUM CO.,LTD.",
            "duration": "Mar 2019 - Dec 2020",
            "location": "Tokyo, Japan",
        },
        {
            "id": 4,
            "title": "Attache",
            "company": "Embassy of Japan in Vietnam",
            "duration": "Sep 2015 - Aug 2018",
            "location": "Hanoi, Vietnam"
        }
    ])
});

app.get("/getOverview", (req, res) => {
    res.json({
        "name": "Lisa Kikuchi",
        "title": "Full-stack Developer",
        "description": "Turning ideas into robust full-stack solutions—efficient, elegant, and impactful",
        "introduction": "With expertise in Node.js, Express, MongoDB, and SQL, I focus on building scalable and efficient server-side systems. While I have experience with React and React Native, I enjoy solving complex problems and optimizing performance behind the scenes.",
        "imageUrl": "http://localhost:8000/uploads/sample-img.jpg",
        "email": "lisa@gmail.com",
        "linkedIn": "lisa@linkedin.com",
        "gitHub": "lisa@github.com"
    }
    )
});

app.get("/getSkills", (req, res) => {
    res.json({
        "technicalSkills": {
            "programmingLanguages": ["Java", "JavaScript", "Python", "SQL"],
            "backendDevelopment": ["Node.js", "MongoDB", "Mongoose", "RESTful API", "Django"],
            "frontendDevelopment": ["React.js", "React Native", "Bootstrap"],
            "relevantSkills": ["Git", "GitHub", "Postman & API Testing", "Problem Solving", "Data Structures", "Algorithms", "Agile/Scrum Methodologies"],
        },
        "softSkills": ["English", "Vietnamese", "Japanese"]
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});