
// UI elements of the sign up form
const signup_form = document.getElementById("signup-form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const email = document.getElementById("SignUpEmail");
const password = document.getElementById("signUpPassword");


async function signupFormSubmit(event) {
    // prevent it auto refreshes the screen
    event.preventDefault();
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            email: email.value,
            password: password.value
        }),
    };
    const response = await fetch("http://localhost:3000/signup", options)
        .then(() => {
            console.log("successully fetching signup endpoint")
        }).catch(error => {
            console.log(error);
        })
}

signup_form.addEventListener("submit", signupFormSubmit);

