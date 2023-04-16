import express from "express";
import path from "path";
import bcrypt from "bcrypt"; // help us hash passwords
const router = express.Router();
const __dirname = path.resolve();

const users = [];

// main page
router.get('/', (req, res) => {
    // index html is found two levels above
    res.sendFile(path.join(__dirname, "../","index.html"));
})

// signup endpoint
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/","signup.html"));
})

// signup for submitting a form
router.post('/signup', async (req, res) =>  {
    
    // sanity check
    const userPassword   = req.body.password, userEmail = req.body.email;
    if (userPassword.length == 0 || userEmail.length == 0) {
        res.redirect('/signup');
    }

    try { // successfuly user sign up
        // hash the user password and add 10 rounds of salt by default
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const user = {
            email: userEmail, 
            password: hashedPassword
        };
        users.push(user);
        console.log(users);
        res.status(201).send();
    } catch { // something is wrong
        res.status(500).send();
    }
});

// login endpoint
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/front-end/HTML/","login.html"));
})

export default router;