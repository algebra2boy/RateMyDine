import express from "express";
import { validationResult } from "express-validator";
import path from "path";
import * as userDBUtils from "../../DataBase/userDBUtils.js";
import server from "../../server.js";
import passportAuth from "../authentication/passportAuth.js";
import { ValidateSignupSchema } from "../../schema/authentication-schema.js";

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
authRouter.post('/signup', ValidateSignupSchema, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors  : errors.array(),
            success : false
        })
    }

    const user = await userDBUtils.findUser(server.users, req.body.userName);
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
        if (error) { return next(error); }
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

// router to return the information of a user including its fullname, email and username
authRouter.get('/userinfo/:userName', async (req, res) => {
    const userName = req.params.userName;
    const userInfo = await server.users.findOne( {"userName": userName} );
    if (userInfo) {
        res.send(userInfo)
    } else {
        res.status(404).send({
            message: `${userName} is not found`,
            status: "failure",
        });
    }
});

//router to update the information of a user's fullname and email using username
authRouter.post('/userinfo/:userName', async (req, res) => {
    const userName = req.params.userName;
    const userInfo = await server.users.findOne( { "userName": userName } );
    if (userInfo) {
        const { fullName, email, userName } = req.body;
        await server.users.updateOne( { "userName": userName }, 
        { $set: {
            fullName: fullName,
            email: email
        }});
        res.send(userInfo)
    } else {
        res.status(404).send({
            message: `${userName} is not found`,
            status: "failure",
        });
    }
});

// check remote server is remote session is active 
authRouter.get('/session', (req, res) => {
 res.send(req.session);
});

export default authRouter;
