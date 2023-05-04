
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
            fullName: firstName.value + " " + lastName.value,
            userName: userName.value,
            email: email.value,
            password: password.value
        }),
    };
    await fetch("http://localhost:3000/signup", options)
        .then((response) => response.json())
        .then(response => {
            if (response["status"] === "success") {
                window.location.href = "/login";
            }
        })
        .catch(error => {
            console.log(error);
        })
}

signup_form.addEventListener("submit", signupFormSubmit);
