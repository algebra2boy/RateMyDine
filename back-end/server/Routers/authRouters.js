import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of this project
import bcrypt from "bcrypt"; // help us hash passwords (for later)
import { validationResult } from "express-validator";
import { ValidateSignupSchema, ValidateLoginSchema } from "../../schema/authentication-schema.js"; // used to validate user's input on the login and sign up page
const authRouter = express.Router();

const __dirname = path.resolve();

// TODO: implement pounchDB and initialize the DB here

console.log(__dirname);

// Express routing documentation: https://expressjs.com/en/guide/routing.html
// the default endpoint to retrieve main page
authRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "", "index.html"));
})

// signup endpoint to retrieve sign up page
authRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "signup.html"));
})

// signup for submitting a form
authRouter.post('/signup', ValidateSignupSchema, (req, res) => {
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
});

// login endpoint to retrieve login page
authRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "login.html"));
})

// login endpoint for submitting a form
authRouter.post('/login', ValidateLoginSchema, (req, res) => {
    const {LoginEmail, LoinInPassword} = req.body;
    res.send({ "Mes": "Welcome", LoginEmail: LoginEmail, LoinInPassword: LoinInPassword });
})

export default authRouter;

// use for hashing
// const hashedPassword = await bcrypt.hash(userPassword, 10);