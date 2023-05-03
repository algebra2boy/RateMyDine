
async function createUser(collection, body) {
    try {
        const { userName, email, password, fullName } = body;
        await collection.insertOne({
            userName: userName,
            email: email,
            passwort: password,
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




export {
    createUser,
    findUser
}