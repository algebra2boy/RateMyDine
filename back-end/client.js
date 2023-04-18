const signup_form = document.getElementById("signup-form");
const signUpFirstName = document.getElementById("firstName");
const signUpLastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const signUpEmail = document.getElementById("SignUpEmail");
const signUpPassword = document.getElementById("signUpPassword");

const signUpWarningList = document.getElementById("signup-warning");
const signUpAlertArea = document.getElementById("signup-alert");

// generate the alert section if the user is not following the rules 
function generateAlertSection(responseJSON) {
    const errorsArray = responseJSON["message"]["errors"];
    // clean up the previous alert
    signUpWarningList.innerHTML = "";
    // make a list for each error
    errorsArray.forEach(error => {
        const warning_list = document.createElement("li");
        warning_list.innerHTML = error["msg"];
        signUpWarningList.appendChild(warning_list);
    });
    // make the alert appear on the screen
    signUpAlertArea.style.display = "block";
}


async function signupFormSubmit(event) {
    // prevent it auto refreshes the screen
    event.preventDefault()
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
    }
    const response = await fetch("http://localhost:3000/signup", options)
        .then(response => response.json())
        // https://stackoverflow.com/questions/39021870/fetch-returns-promise-instead-of-actual-data-even-after-using-then
        .then((responseJSON) => {
            console.log(responseJSON);
            if (responseJSON["status"] === "failure") {
                generateAlertSection(responseJSON);
            } else {
                // clean up the previous alert
                signUpAlertArea.innerHTML = "";
            }
        })
        .catch(error => { console.log(error); })
    console.log("HELLO");
}

signup_form.addEventListener("submit", signupFormSubmit);

