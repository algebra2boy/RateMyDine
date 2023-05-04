import express from "express"; // allow us to construct endpoints
import path from "path"; // to find the current path of this project
import * as userDBUtils from "../../DataBase/userDBUtils.js";
import server from "../../server.js";
import passportAuth from "../authentication/passportAuth.js"

const authRouter = express.Router();
passportAuth.configure(authRouter);

const __dirname = path.resolve();

// Express routing documentation: https://expressjs.com/en/guide/routing.html

// check if the user is authenticated
function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
    } else {
        // Otherwise, redirect to the login page.
        res.redirect('/login');
    }
}

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
    console.log(req.body);

    if (await userDBUtils.findUser(server.users, req.body.email)) {
        // making another account with the same email
        res.status(403).send({
            message: `User is already existed`,
            status: "failure",
        });
    } else {
        try {
            await userDBUtils.createUser(server.users, req.body);
            res.redirect('/login');
        } catch (error) {
            res.status(500).send({ status: "failure" });
        }
    }
});

// login endpoint to retrieve login page
authRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/client/HTML/", "login.html"));
})

authRouter.post(
    '/login',
    passportAuth.authenticate('local', {
        // user email/password authentication 
        successRedirect: '/',
        failureRedirect: '/login',
    })
);

// Handle logging out (takes us back to the login page).
authRouter.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/');
  });
  


// // login endpoint for submitting a form
// authRouter.post('/login', async (req, res) => {
//     const { LoginEmail, LoinInPassword } = req.body;

//     try {
//         // check if the user is in the DB 
//         let userDocument = await userDB.get(LoginEmail);
//         // exists with correct password
//         if (userDocument["password"] === LoinInPassword) {
//             res.redirect("/");
//         } else { // incorrect passwrod 
//             res.status(404).send({
//                 message: `User with ${LoginEmail} login in unsuccessfully with incorrect password`,
//                 status: "failure",
//             });
//         }

//     } catch (error) {
//         console.log("An error occurs when user tries to login")
//         res.status(500).send({ status: "failure" });
//     }
// })

export default authRouter;
