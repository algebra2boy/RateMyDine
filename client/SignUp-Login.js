const signup_form = document.getElementById("signup-form");
const signUpFirstName = document.getElementById("firstName");
const signUpLastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const signUpEmail = document.getElementById("SignUpEmail");
const signUpPassword = document.getElementById("signUpPassword");


async function signupFormSubmit(event) {
    // prevent it auto refreshes the screen
    event.preventDefault();
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            firstName: signUpFirstName.value,
            lastName: signUpLastName.value,
            userName: userName.value,
            SignUpEmail: signUpEmail.value,
            signUpPassword: signUpPassword.value
        }),
    };
    const response = await fetch("http://localhost:3000/signup", options)
        .then(function () {
            console.log("successully fetching signup endpoint")
        }).catch(error => {
            console.log(error);
        })
}

signup_form.addEventListener("submit", signupFormSubmit);

