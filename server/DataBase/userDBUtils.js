
async function createUser(collection, body) {
    try {
        const { userName, email, password, fullName } = body;
        await collection.insertOne({
            userName: userName,
            email: email,
            password: password,
            fullName: fullName
        });
    } catch (error) {
        console.log(error);
    }
}

async function findUser(collection, email) {
    try {
        const user = await collection.findOne({ email: email });
        return user !== null;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function validatePassword(collection, email, password) {
    try {
        const user = await collection.findOne({ email: email });
        return user.password === password
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function deleteUser(collection, email) {
    try {
        await collection.deleteOne({ email: email });
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(collection, body) {
    try {
        const { userName, email, password, fullName } = body;
        await collection.updateOne(
            { userName: userName }, // searching user with this username
            {
                $set:
                {
                    email: email,
                    password: password,
                    fullName: fullName
                }
            },
            { upsert: true } // insert the document if it is not found
        )
    } catch (error) {
        console.log(error);
    }
}

export {
    createUser,
    findUser,
    validatePassword,
    deleteUser,
    updateUser
}