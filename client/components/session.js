
// access to the UI element 
const login_btn  = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");

// session variable to know whether the user is authenticated after logining
// this session variable will be gone after the user clicks on the logout or session is inactive after 15 minutes
// isAuthenticated is either true or false

// send a request to server to see if there is any active session
fetch("http://localhost:3000/session")
    .then((sessionResponse => sessionResponse.json()))
    .then((session) => {
    // remote session is active, therefore turn on the session even though browser is closed
        if ("passport" in session) {
            sessionStorage.setItem("isAuthenticated", JSON.stringify(true)); 
        }
});


// check user is authenticated
const isAuthenticated   = JSON.parse(sessionStorage.getItem("isAuthenticated"));
login_btn.innerHTML     = isAuthenticated ? "Profile" : "Log in";
signup_btn.innerHTML    = isAuthenticated ? "Log out" : "Sign up";
login_btn.href          = isAuthenticated ? "/profile": "/login";
signup_btn.href         = isAuthenticated ? "/logout" : "/signup";


// user is authenticated
if (isAuthenticated) {

    signup_btn.addEventListener("click", destorySession);

    function destorySession(event) {
        event.preventDefault();
        const options = { headers: { "Content-Type": "application/json" }, method: "POST" };
        fetch("http://localhost:3000/logout", options)
            .then((request) => {
                if (request.redirected) {
                    sessionStorage.setItem("isAuthenticated", JSON.stringify(false));
                    console.log("session has been destoryed remotely and on local");

                    login_btn.innerHTML = "Log in";
                    signup_btn.innerHTML = "Sign up";
                    login_btn.href = "/login";
                    signup_btn.href = "/signup";
                    // deactivate click after switching back to "login" mode
                    signup_btn.removeEventListener('click', destorySession);

                    // redirect to the main page
                    window.location.replace(request.url);
                }
            }).catch(error => {
                console.error(error);
            });
    }
}