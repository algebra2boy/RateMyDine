import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of this project
import bcrypt from "bcrypt"; // help us hash passwords (for later)
import { validationResult } from "express-validator";
import { ValidateSignupSchema, ValidateLoginSchema } from "../../schema/authentication-schema.js"; // used to validate user's input on the login and sign up page
import { userDB } from "../server.js";
const authRouter = express.Router();

const __dirname = path.resolve();

console.log(__dirname);

// Express routing documentation: https://expressjs.com/en/guide/routing.html
// the default endpoint to retrieve main page
authRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

// signup endpoint to retrieve sign up page
authRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "signup.html"));
})

// signup for submitting a form
authRouter.post('/signup', ValidateSignupSchema, async (req, res) => {
    // user is not following the rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).send({
            message: errors,
            status: "failure",
        });
    }
    // check if the user is already existed in the database 
    try {
        let userDocument = await userDB.get(req.body.SignUpEmail);
        // when the account exists, but try to create an account with the same email again
        if (JSON.stringify(userDocument) !== "{}") {
            res.status(403).send({
                message: `User with id ${req.body.SignUpEmail} is already existed`,
                status: "failure",
            });
        }
    } catch (error) {
        // when the account does not exists, then create an account
        const { firstName, lastName, userName, SignUpEmail, signUpPassword } = req.body;
        try {
            const newRateMyDineUser = await userDB.put({
                _id: SignUpEmail,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: SignUpEmail,
                password: signUpPassword
            });
            console.log(newRateMyDineUser);
            res.status(201).send({
                message: `successfully created user with ID ${newRateMyDineUser.id}`,
                status: "success"
            });
        } catch (error) {
            console.log("An error occurs when pouchDB tries to create an account for the user")
            res.status(500).send({ status: "failure" });
        }
    }
});

// login endpoint to retrieve login page
authRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/", "login.html"));
})

// login endpoint for submitting a form
authRouter.post('/login', ValidateLoginSchema, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).send({
            message: errors,
            status: "failure",
        });
        return;
    }
    const { LoginEmail, LoinInPassword } = req.body;
    res.send({ "Mes": "Welcome", LoginEmail: LoginEmail, LoinInPassword: LoinInPassword });
})

export default authRouter;

// use for hashing
// const hashedPassword = await bcrypt.hash(userPassword, 10);