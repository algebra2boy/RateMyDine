// access to the UI element 
const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");

// session variable to know whether the user is authenticated after logining
// this session variable will be gone after the user closes the browser
// isAuthenticated is either "true" or "false" (a string)
const isAuthenticated = sessionStorage.getItem("isAuthenticated");

// check user is authenticated
const loginText = isAuthenticated === "true" ? "Profile" : "Log in";
const signupText = isAuthenticated === "true" ? "Log out" : "Sign up";
const loginUrl = isAuthenticated === "true" ? "/profile" : "/login";
const signupUrl = isAuthenticated === "true" ? "/" : "/signup";

login_btn.innerHTML = loginText;
signup_btn.innerHTML = signupText;
login_btn.href = loginUrl;
signup_btn.href = signupUrl;

// destory session
if (isAuthenticated === "true") {
    signup_btn.addEventListener("click", destorySession);
    sessionStorage.setItem("isAuthenticated", false);

    async function destorySession(event) {
        event.preventDefault();
        const options = { headers: { "Content-Type": "application/json" }, method: "POST" };
        await fetch("http://localhost:3000/logout", options)
            .then((request) => {
                if (request.redirected) {
                    console.log("session has been destoryed remotely and on local");
                    login_btn.innerHTML = "Log in";
                    signup_btn.innerHTML = "Sign up";
                    login_btn.href = "/login";
                    signup_btn.href = "/signup";
                }
            }).catch(error => {
                console.log(error);
            })
    }
}

