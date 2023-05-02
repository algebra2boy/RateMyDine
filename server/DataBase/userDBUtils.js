import { server } from '../server.js'

const usersDB = server.client.users;

// Returns true iff the user exists.
async function findUser(email) {
    return usersDB.findOne({email: email}) !== null;
}

// Returns true iff the password is the one we have stored (in plaintext = bad
// but easy).
async function validatePassword(email, pwd) {
    // if (!this.findUser(email)) {
    // return false;
    // }
    // if (this.users[email] !== pwd) {
    // return false;
    // }
    // return true;
}

// Add a user to the "database".
async function addUser(user, email, pwd, fullName) {
    if (findUser(email)) {
        return false;
    }
    try {
        usersDB.insertOne({
            userID: '1234',
            userName: user,
            email: email,
            password: password,
            fullName: fullName
        });
        return true;
    } catch (err) {
        return false;
    }
}

export {
    findUser,
    validatePassword,
    addUser
}