
async function createUser(collection, body) {
    try {
        const { userName, email, password, firstName, lastName } = body;
        await collection.insertOne({
            userName: userName,
            email: email,
            password: password,
            fullName: firstName + " " + lastName
        });
    } catch (error) {
        console.error(error);
    }
}

async function findUser(collection, userName) {
    try {
        const user = await collection.findOne({ userName: userName });
        return user !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function validatePassword(collection, userName, password) {
    try {
        const user = await collection.findOne({ userName: userName });
        return user.password === password;
        
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function deleteUser(collection, userName) {
    try {
        await collection.deleteOne({ userName: userName });
    } catch (error) {
        console.error(error);
    }
}

async function updateUser(collection, body) {
    try {
        const { userName, email, password, firstName, lastName } = body;
        await collection.updateOne(
            { userName: userName }, // searching user with this username
            {
                $set:
                {
                    email: email,
                    password: password,
                    fullName: firstName + " " + lastName
                }
            },
            { upsert: true } // insert the document if it is not found
        );
    } catch (error) {
        console.error(error);
    }
}

export {
    createUser,
    findUser,
    validatePassword,
    deleteUser,
    updateUser,
}