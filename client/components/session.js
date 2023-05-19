
// access to the UI element 
const login_btn  = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");

// session variable to know whether the user is authenticated after logining
// this session variable will be gone after the user clicks on the logout or session is inactive after 15 minutes
// isAuthenticated is either true or false

// reset the button to the "log-in" state
function resetToDefault() {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(false));
    login_btn.innerHTML  = "Log in";
    signup_btn.innerHTML = "Sign up";
    login_btn.href       = "/login";
    signup_btn.href      = "/signup";
}

function destorySession(event) {
    event.preventDefault();
    const options = { headers: { "Content-Type": "application/json" }, method: "POST" };
    fetch("http://localhost:3000/logout", options)
        .then((request) => {
            if (request.redirected) {
                console.log("session has been destoryed remotely and on local");
                resetToDefault();

                // deactivate click after switching back to "login" mode
                signup_btn.removeEventListener('click', destorySession);

                // redirect to the main page
                window.location.replace(request.url);
                location.reload();
            }
        }).catch(error => {
            console.error(error);
        });
}

// send a request to server to see if there is any active session
fetch("http://localhost:3000/session")
    .then((sessionResponse => sessionResponse.json()))
    .then((session) => {
        // remote session is active, therefore turn on the session even though browser is closed
        if ("passport" in session) {
            sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
            login_btn.innerHTML  = "Profile";
            signup_btn.innerHTML = "Log out";
            login_btn.href       = "/profile";
            signup_btn.removeAttribute("href"); // no need to add /logout since we manually do a post logout on the endpoint
            signup_btn.style.cursor = "pointer";
            signup_btn.addEventListener("click", destorySession);
        }
});