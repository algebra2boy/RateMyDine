import express from "express";
import path from "path";
import * as userDBUtils from "../../DataBase/userDBUtils.js";
import server from "../../server.js";
import passportAuth from "../authentication/passportAuth.js";

const authRouter = express.Router();
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
authRouter.get('/', checkLoggedIn, (req, res) => {
    res.sendFile(__dirname + "index.html");
});

// signup endpoint to retrieve sign up page
authRouter.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/client/HTML/signup.html");
});

// signup for submitting a form
authRouter.post('/signup', async (req, res) => {
    const user = userDBUtils.findUser(server.users, req.body.email);
    if (user) {
        // making another account with the same email
        res.status(403).send({
            message: `User is already existed`,
            status: "failure",
        });
    } else {
        try {
            await userDBUtils.createUser(server.users, req.body);
            res.redirect("/login");
        } catch (error) {
            res.status(500).send({ status: "failure" });
        }
    }
});

// login endpoint to retrieve login page
authRouter.get('/login', (req, res) => {
    res.sendFile(__dirname + "/client/HTML/login.html");
});

// login endpoint for submitting a form
authRouter.post('/login',
    passportAuth.authenticate('local', {
        // user email/password authentication 
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// Handle logging out (takes us back to the login page).
authRouter.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login');
});

authRouter.get('/profile',
    checkLoggedIn,
    (req, res) => {
        // sessionID
        // user
        res.send('my session ID is ' + req.sessionID);
        // res.redirect('/profile/' + req.sessionID);
    }
);

authRouter.get('/testing',
    (req, res) => {
        console.log(req);
        // sessionID
        // user
        res.send("my sesion ID is " + req.sessionID + "and I am " + req.user + "uid is ")
    }
);

// A dummy page for the user.
// authRouter.get(
//     '/profile/:userID/',
//     checkLoggedIn, // We also protect this route: authenticated...
//     (req, res) => {
//       // Verify this is the right user.
//       if (req.params.userID === req.user) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<H1>HELLO ' + req.params.userID + '</H1>');
//         res.write('<br/><a href="/logout">click here to logout</a>');
//         res.end();
//       } else {
//         res.redirect('/private/');
//       }
//     }
//   );

export default authRouter;
