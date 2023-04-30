import { MongoClient, ServerApiVersion } from 'mongodb';

export class RateMyDineDatabase {

    constructor(dbURL) {
        this.dbURL = dbURL;
    }

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    async connect() {

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
            this.db = this.client.db("RateMyDine");
            this.users = this.db.collection("users");
            this.reviews = this.db.collection("reviews");


            // testing purpose
            const count = await this.users.countDocuments();
            console.log(`count is ${count}`); 
            // use findOne() in node.js but use find() in mongoShell
            const user = await this.users.findOne({"userID": "1234"})
            console.log(`user has been found ${JSON.stringify(user)}`)

        } finally {
            // Ensures that the client will close when you finish/error
            this.close();
        }
    }

    async close() {
        await this.client.close();
    }

}