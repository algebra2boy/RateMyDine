import express from "express";
import path from "path";
const router = express.Router();
const __dirname = path.resolve();

// main page
router.get('/', (req, res) => {
    // index html is found two levels above
    res.sendFile(path.join(__dirname, "../","index.html"));
})

// signup endpoint
router.get('/signup', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/front-end/HTML/","signup.html"));
})

// login endpoint
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/","login.html"));
})

export default router;