import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of this project
import { userDB } from "../../server.js";
const authRouter = express.Router();

const __dirname = path.resolve();

// Express routing documentation: https://expressjs.com/en/guide/routing.html
// the default endpoint to retrieve main page
authRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

// signup endpoint to retrieve sign up page
authRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/HTML/", "signup.html"));
})

// signup for submitting a form
authRouter.post('/signup', async (req, res) => {
    try {
        let userDocument = await userDB.get(req.body.SignUpEmail);
        // when the account exists, but try to create an account with the same email again
        res.status(403).send({
            message: `User with id ${req.body.SignUpEmail} is already existed`,
            status: "failure",
        });
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
            res.redirect("/login");
        } catch (error) {
            console.log("An error occurs when pouchDB tries to create an account for the user")
            res.status(500).send({ status: "failure" });
        }
    }
});

// login endpoint to retrieve login page
authRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/HTML/", "login.html"));
})

// login endpoint for submitting a form
authRouter.post('/login', async (req, res) => {
    const { LoginEmail, LoinInPassword } = req.body;

    try {
        // check if the user is in the DB 
        let userDocument = await userDB.get(LoginEmail);
        // exists with correct password
        if (userDocument["password"] === LoinInPassword) {
            res.redirect("/");
        } else { // incorrect passwrod 
            res.status(404).send({
                message: `User with ${LoginEmail} login in unsuccessfully with incorrect password`,
                status: "failure",
            });
        }

    } catch (error) {
        console.log("An error occurs when user tries to login")
        res.status(500).send({ status: "failure" });
    }
})

export default authRouter;
