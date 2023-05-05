
// UI elements of the login form
const login_form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");


async function loginFormSubmit(event) {
    // prevent it auto refreshes the screen
    event.preventDefault();
    // specifying the fetch option
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        credentials: "include"
    };
   await fetch("http://localhost:3000/login", options)
        .then(() => {
            console.log("successully fetching login endpoint")
        }).catch(error => {
            console.log(error);
        })
}

login_form.addEventListener("submit", loginFormSubmit);

