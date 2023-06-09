## Instruction on how to run mongoDB

1. Open up terminal, and enter the following command line: 
    - mongosh "mongodb+srv://cluster0.g5oouwb.mongodb.net/myFirstDatabase" --apiVersion 1 --username rateMyDine
2. Enter the password

## Important command lines 
- show dbs;
- use RateMyDine;
- show collections;
    - there will be two collections: users and reviews
- example 
    - This looks for "users" collection, and find the documents with userID "1234"
        - db.users.find({"userID": "1234"}); 

## Connect MongoDB using Mongo Compass
- Download [Mongo Compass](https://www.mongodb.com/products/compass), the GUI of Mongo shell
- URL connection (replace the link of "mongodb://localhost:27017" to the following link)
    - mongodb+srv://rateMyDine:<password>@cluster0.g5oouwb.mongodb.net/test
- Click on "Advanced Connection Options"
    - Go to Authentication and click on "Username/Password"
    - Change the password to our password

## Structure 
- These are called database
    - Admin (database)
    - Local (database)
    - RateMyDine (database)
        - Users (collection)
            - Document1
            - Document2
            - Document3
        - Reviews (collection)
            - Document1
            - Document2


## Important CRUD operations
    - collection.countDocuments()
        - count how many documents in a collection
    - collection.insertOne({})
        - insert a document in a collection
    - collection.findOne({})
        - find a document in a collection
    - collection.updateOne({})
        - update a document in a collection
    - collection.deleteOne({})
        - delete a document in a collection
    - collection.find({}).toArray()
        - get all the documents in a collection and then convert to an array


