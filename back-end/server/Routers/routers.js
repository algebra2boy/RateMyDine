import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of this project
import bcrypt from "bcrypt"; // help us hash passwords (for later)
import { validationResult } from "express-validator";
import { ValidateSignupSchema, ValidateLoginSchema } from "../../schema/authentication-schema.js"; // used to validate user's input on the login and sign up page
const router = express.Router();

const __dirname = path.resolve();

// TODO: implement pounchDB and initialize the DB here

console.log(__dirname);
// main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "", "index.html"));
})

// signup endpoint
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "signup.html"));
})

// signup for submitting a form
router.post('/signup', ValidateSignupSchema, (req, res) => {
    console.log(req.body);
    // user is not following the rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            message: errors,
            status: "failure"
        });
        return;
    }
    // TODO: implement the sign up feature when the user input are correct
    // Check if the user is already exists in the DB. If not, then create an row; otherwise, display error teling users that account existed
    res.json({
        status: "success"
    });
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