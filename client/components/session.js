// access to the UI element 
const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");

// session variable to know whether the user is authenticated after logining
// this session variable will be gone after the user closes the browser
// isAuthenticated is either trur or false
const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuthenticated"));

// check user is authenticated
login_btn.innerHTML = isAuthenticated  ? "Profile" : "Log in";
signup_btn.innerHTML = isAuthenticated ? "Log out" : "Sign up";
login_btn.href = isAuthenticated   ? "/profile" : "/login";
signup_btn.href = isAuthenticated  ? "/logout" : "/signup";
// destory session
if (isAuthenticated) {
    signup_btn.addEventListener("click", destorySession);

    async function destorySession(event) {
        event.preventDefault();
        const options = { headers: { "Content-Type": "application/json" }, method: "POST" };
        await fetch("http://localhost:3000/logout", options)
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
                console.log(error);
            })
    }
}