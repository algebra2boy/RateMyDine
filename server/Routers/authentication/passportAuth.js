import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import server from "../../server.js";
import * as userDBUtils from "../../DataBase/userDBUtils.js";

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using userName and password

const strategy = new LocalStrategy(async (userName, password, done) => {
    try {
        // cannot find the user 
        const user = await userDBUtils.findUser(server.users, userName);
        if (!user) {
            console.log("invalid email");
            return done(null, false, { message: 'Invalid email' });
        }

        // passoword is not correct
        const isValidPassword = await userDBUtils.validatePassword(server.users, userName, password);
        if (!isValidPassword) {
            console.log("password is not correct");
            await new Promise((rate) => setTimeout(rate, 2000)); // 2 seconds delay
            return done(null, false, { message: 'password is incorrect' });
        }

        // success => get document id, levels up security by not passing the userName
        const user_documentID = await userDBUtils.getDocumentID(server.users, userName);
        return done(null, user_documentID);

    } catch (error) {
        return done(error);
    }
});

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a user email and password
passport.use(strategy);

// Convert user object to a unique identifier.
// can access to user by doing req.user, which gets access to the document ID
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
        app.use(passport.initialize());
        // Middleware that will restore login state from a session
        app.use(passport.session());
    },

    authenticate: (domain, where) => {
        return passport.authenticate(domain, where);
    }
};