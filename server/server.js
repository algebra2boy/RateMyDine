import authRouter from "./Routers/authentication/authRouters.js";
import reviewRouter from "./Routers/reviewRouters.js";
import passportAuth from "./Routers/authentication/passportAuth.js";
import { RateMyDineDatabase } from "./DataBase/rateMyDineDB.js";

import expressSession from 'express-session';
import express from "express";
import logger from "morgan";
import PouchDB from "pouchdb";

import * as dotenv from 'dotenv';

dotenv.config()  // load environment variables 

// implement pounchDB and initialize the DB here
let userDB = new PouchDB("users");
let reviewDB = new PouchDB("reviews");

//for testing purposes
// app.delete("/db", async (req, res) => {
//     await reviewDB.destroy()
//     reviewDB = new PouchDB("reviews");
//     res.send("Success");
// })

class Server {

    constructor(dbURL) {
        this.dbURL = dbURL;
        this.app = express();
        this.port = process.env.DEV_PORT;

        // session configuration
        this.sessionConfig = {
            secret: process.env.SECRETKEY || 'MYFRIENDISACAT',
            resave: false,
            saveUninitialized: false,
        }
    }

    async initRoutes() {
        this.app.use(authRouter);
        this.app.use(reviewRouter);
    }

    async initDB() {
        this.client = new RateMyDineDatabase(process.env.DATABASE_URL)
        await this.client.connect();
    }

    setupConfig() {

        // a built-in middleware function in Express that serves static files and is based on serve-static.
        this.app.use(express.static("."));

        // Support JSON on requests and HTML form
        this.app.use(express.json());

        // Use the logger middleware to easily log every HTTP request to our server
        this.app.use(logger("dev"));

        // decode the the request body send through html form
        this.app.use(express.urlencoded({ extended: true }));

        // set up session middleware
        this.app.use(expressSession(this.sessionConfig));

        // configure our authentication stratefy
        passportAuth.configure(this.app);

    }

    async runServer() {

        try {

            this.setupConfig();
            await this.initRoutes();
            await this.initDB();

            this.app.listen(this.port, () => {
                console.log(`server started at ${this.port}`);
            });

            // kill the server process to prevent running ( SIGINT is same as CTRL+C )
            // if we do not do this, there an issue relating to "address already in use::3000"
            process.on('SIGINT', () => {
                this.client.close();
                console.log("Database connection has been closed")
                process.exit(0);
            });

        } catch (error) {
            console.log(error);
        }

    }

}

const server = new Server(process.env.DATABASE_URL);
server.runServer();

export { userDB, reviewDB };