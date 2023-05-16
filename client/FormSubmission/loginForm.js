// UI elements of the login form
const login_form = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// set up session storage
sessionStorage.setItem("isAuthenticated", JSON.stringify(false));

function loginFormSubmit(event) {
    // prevent it auto refreshes the screen
    event.preventDefault();
    // specifying the fetch option
    const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ username: username.value, password: password.value })
    };
    fetch("http://localhost:3000/login", options)
        .then((request) => {
            if (request.redirected && request.url === "http://localhost:3000/") {
                // save the user's state
                sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
                window.location.replace(request.url);
            }
        }).catch((error) => {
            console.error(error);
        })
}

login_form.addEventListener("submit", loginFormSubmit);