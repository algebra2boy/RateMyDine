const signup_form = document.getElementById("signup-form");
const signUpfirstName = document.getElementById("firstName");
const signUplastName = document.getElementById("lastName");
const userName = document.getElementById("userName");
const email = document.getElementById("SignUpEmail");
const password = document.getElementById("signUpPassword");

const signUpWarningList = document.getElementById("signup-warning");
const signUpArea = document.getElementById("signup-alert");

function generateAlertSection(responseJSON) {
    const errors = responseJSON["message"]["errors"];
    for (let number = 0; number < errors.length; ++number) {
        const warning_list = document.createElement("li");
        warning_list.innerHTML = errors[number]["msg"];
        console.log(warning_list);
        signUpWarningList.appendChild(warning_list);
    }
    signUpArea.style.display = "block";
}


async function signupFormSubmit(event) {
    // prevent it refreshes the scren
    event.preventDefault()
    const response = await fetch("http://localhost:3000/signup", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            firstName: signUpfirstName.value,
            lastName: signUplastName.value,
            userName: userName.value,
            email: email.value,
            password: password.value
        }),
    })
        .then(response => response.json())
        // https://stackoverflow.com/questions/39021870/fetch-returns-promise-instead-of-actual-data-even-after-using-then
        .then((responseJSON) => {
            console.log(responseJSON);
            if (responseJSON["status"] === "failure") {
                generateAlertSection(responseJSON);
            }
        })
        .catch(error => { console.log(error); })
}

signup_form.addEventListener("submit", signupFormSubmit);

