import passport from 'passport';
import passportLocal from "passport-local";
import server from "../../server.js";
import * as userDBUtils from "../../DataBase/userDBUtils.js";

const { Strategy } = passportLocal;

// Passport Configuration
// Create a new LocalStrategy objec to handle authentienticaiton using email and password
// from the client

const strategy = new Strategy(async (email, password, done) => {
    console.log("HELLLLLLLL");
    // cannot find the user 
    if (! await userDBUtils.findUser(server.users)) {
        return done(null, false, { message: 'email is not found' });
    }
    console.log("email is found");

    // invalid password 
    if (! await userDBUtils.validatePassword(server.users, email, password)) {
        await new Promise((rate) => setTimeout(rate, 2000)); // 2 seconds delay
        return done(null, false, { message: 'password is incorrect' });
    }
    console.log("user passport is correct");

    // success!
    // should create a user object here, associated with a unique identifier
    return done(null, email);

})

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a user email and password
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

// export the strategy for the server to use 
export default {

    configure: (app) => {
        // Intializes Passport for incoming requests, allowing authentication strategies to be applied.
        app.use(passport.initialize())
        // Middleware that will restore login state from a session
        app.use(passport.session())
    },

    authenticate: (domain, where) => {
        return passport.authenticate(domain, where)
    },
};