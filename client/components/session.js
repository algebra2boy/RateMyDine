// access to the UI element 
const login_btn  = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");

// session variable to know whether the user is authenticated after logining
// this session variable will be gone after the user closes the browser
// isAuthenticated is either "true" or "false" (a string)
const isAuthenticated = sessionStorage.getItem("isAuthenticated");

// check user is authenticated
const loginText  = isAuthenticated === "true" ? "Profile"  : "Log in";
const signupText = isAuthenticated === "true" ? "Log out"  : "Sign up";
const loginUrl   = isAuthenticated === "true" ? "/profile" : "/login";
const signupUrl  = isAuthenticated === "true" ? "/logout"  : "/signup";

// change text and redirect url
login_btn.innerHTML   = loginText;
signup_btn.innerHTML  = signupText;
login_btn.href        = loginUrl;
signup_btn.href       = signupUrl;


