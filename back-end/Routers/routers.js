import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of the this file
import bcrypt from "bcrypt"; // help us hash passwords (for later)
import { validationResult } from "express-validator";
import { ValidateSignupSchema } from "../schema/signup-schema.js"; // used to validate user's input on the sign up page
import { ValidateLoginSchema } from "../schema/login-schema.js"; // used to validate user's input on the login page
const router = express.Router();

const __dirname = path.resolve();

const users = [];

// main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../", "index.html"));
})

// signup endpoint
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "signup.html"));
})

// signup for submitting a form
router.post('/signup', ValidateSignupSchema, (req, res) => {
    // user is not following the rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).json({
            message: errors,
            status: "failure"
        });
        return;
    }
    console.log(req.body);
    // res.send({ "Mes": "HELLO", "body": req.body });
});

// login endpoint
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "login.html"));
})

// login endpoint when submit a form
router.post('/login', ValidateLoginSchema, (req, res) => {
    // const payload = req.body;
    // const email_address = payload.email_address, password = payload.password;
    res.send({ "Mes": "Welcome", "body": req.body });
})

export default router;

// use for hashing
// const hashedPassword = await bcrypt.hash(userPassword, 10);