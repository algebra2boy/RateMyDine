import  *  as commentLoader from "../components/commentLoader.js";
// UI elements for editProfile
// input fields to edit the names
let edit_info  = ["edit-name", "edit-email"], info = ["name", "email"], buttons = ["cancel", "save"];

edit_info = edit_info.map((element) => (document.getElementById(element)));
info      = info.map((element) => (document.getElementById(element))); // before editing the info
buttons   = buttons.map((elememt) => (document.getElementById(elememt)));


// below is where the profile page is being rendered
async function renderProfile() {
    const name = window.location.href.split("/")[4];
    try {
        let userInfo   = await fetch(`http://localhost:3000/userinfo/${name}`);
        userInfo       = await userInfo.json();
        
        // deconstructing the values from the object
        const { fullName, email, userName } = userInfo;
        let infoList = [fullName, email, userName];

        // dynamically change the user info 
        info.forEach((element, index) => element.innerHTML = infoList[index]);
        document.getElementById("user").innerHTML = userName;
        document.getElementById("profile-name").innerHTML = fullName;
    } catch (error) {
        console.error(error);
    }
}

//below is where the profile page is being updated
async function updateProfile() {
    const name = window.location.href.split("/")[4];
    const options = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ fullName: document.getElementById("edit-name").value, email: document.getElementById("edit-email").value, userName: name })
    };
    try {
        await fetch(`http://localhost:3000/userinfo/${name}`, options);
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

// this is where the comments are being rendered 
async function renderProfileComments() {
    const username = window.location.href.split("/")[4];
    try {
        const comments_response = await fetch(`http://localhost:3000/review/user/${username}`);
        const comments          = await comments_response.json();

        const dropDownMenu = document.getElementById('dropDownMenu');
        comments.forEach(c => {
            let newRevID = document.createElement("button");
            newRevID.classList.add('dropdown-item');
            newRevID.setAttribute("id", c.review_ID);
            newRevID.innerHTML = c.review_ID;
            newRevID.addEventListener('click', async () => {
                try {
                    await fetch(`http://localhost:3000/review/${c.location}/${c.review_ID}`, { method: "DELETE" });
                    location.reload();
                } catch (err) {
                    console.log(err);
                }
            });
            dropDownMenu.appendChild(newRevID);
        });

        commentLoader.loadAllComments(comments, document.getElementById('comment-section'));
        
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('edit-info').addEventListener('click', () => {
    info.forEach((element) => element.style.display = "none");
    // bring user's info to the text input field
    edit_info.forEach((element, index) => {  element.type  = "text"; element.value = info[index].innerHTML; } );
    // make button visible if user wants to edit info
    buttons.forEach((button) => button.style.visibility = "visible");
    edit_info.forEach((x) => x.style.backgroundColor = "rgb(248, 248, 248)");
});

// cancel button
buttons[0].addEventListener('click', () => {
    info.map((element)      => element.removeAttribute("style") );
    edit_info.map((element) => element.type = "hidden");
    buttons.map((element)   => element.style.visibility = "hidden");
    edit_info.forEach((x) => x.style.backgroundColor = "rgb(255, 255, 255)");
});

// save button 
buttons[1].addEventListener('click', async() => {
    info.map((element, index)   => { element.removeAttribute("style"); element.innerHTML = edit_info[index].value } );
    edit_info.forEach((element) => element.type  = "hidden" );
    buttons.forEach((button)    => button.style.visibility = "hidden");
    edit_info.forEach((x) => x.style.backgroundColor = "rgb(255, 255, 255)");
    await updateProfile();
});

await renderProfile();
await renderProfileComments();