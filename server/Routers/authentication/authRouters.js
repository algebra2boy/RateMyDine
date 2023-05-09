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
        // user userName/password authentication 
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// Handle logging out (takes us back to the login page).
authRouter.post('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
});

// router to redirect to user profile page
authRouter.get('/profile',
    checkLoggedIn,
    (req, res) => {
        res.redirect('/profile/' + req.user);
    }
);

// router to redirect to user profile page with userName
authRouter.get('/profile/:userName/',
    checkLoggedIn,
    (req, res) => {
        // Verify this is the right user.
        if (req.params.userName === req.user) {
            res.sendFile(__dirname + "/client/HTML/profile.html");
        } else {
            res.redirect('/profile/');
        }
    }
);

export default authRouter;
