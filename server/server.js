import authRouter from "./Routers/authentication/authRouters.js";
import reviewRouter from "./Routers/reviewRouters.js";
import passportAuth from "./Routers/authentication/passportAuth.js";

import MongoStore from 'connect-mongo';
import { MongoClient, ServerApiVersion } from 'mongodb';

import expressSession from 'express-session';
import express from "express";
import logger from "morgan";

import * as dotenv from 'dotenv';

dotenv.config()  // load environment variables 

class Server {
    constructor(dbURL) {
        this.dbURL = dbURL;
        this.app = express();
        this.port = process.env.DEV_PORT;

        this.sessionConfig = {
            secret: process.env.SECRETKEY || 'MYFRIENDISACAT',
            resave: false, // determines whether the session should be saved even if unmodified.
            saveUninitialized: false, // whether a new, uninitialized session should be saved to the store.
            cookie: {
                secure: true, // ensures the session cookie is transmitted over secure HTTPS connections.
                sameSite: 'none' // sets the SameSite attribute to None, allowing cross-site requests.
            },
            // this stores the session in the database
            // documentation: https://github.com/jdesboeufs/connect-mongo#express-or-connect-integration
            store: MongoStore.create({
                mongoUrl: this.dbURL,
                ttl: 15 * 60, // 15 minutes. Default
                autoRemove: 'native',
                autoRemoveInterval: 10, // take care of removing expired sessions every 10 minutes,
                dbName: "test"
            })
        }

    }

    async initRoutes() {
        this.app.use(authRouter);
        this.app.use(reviewRouter);
    }

    async initDB() {
        try {
            this.client = await MongoClient.connect(this.dbURL, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });

            // Send a ping to confirm a successful connection
            await this.client.db("RateMyDine").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            // get database and collections
            this.db         = this.client.db("RateMyDine");
            this.diningInfo = this.db.collection("diningInfo");
            this.users      = this.db.collection("users");
            this.reviews    = this.db.collection("reviews");

            // testing purpose 
            // const rev = await this.reviews.findOne({ "DiningHall": "Worcester" });
            // console.log(rev);

        } catch (error) {
            // Ensures that the client will close when you finish/error
            console.error(error);
        }
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

        // configure our authentication strategy
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
                console.log("Database connection has been closed");
                process.exit(0);
            });

        } catch (error) {
            console.log(error);
        }

    }

}

const server = new Server(process.env.DATABASE_URL);
server.runServer();

export default server;
