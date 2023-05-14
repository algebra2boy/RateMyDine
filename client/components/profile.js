// UI elements for editProfile
// input fields to edit the names
let edit_info  = ["edit-name", "edit-email", "edit-user"], info = ["name", "email", "user"], buttons = ["cancel", "save"];

edit_info = edit_info.map((element) => (document.getElementById(element)));
info      = info.map((element) => (document.getElementById(element))); // before editing the info
buttons   = buttons.map((elememt) => (document.getElementById(elememt)));

document.getElementById('edit-info').addEventListener('click', () => {
    info.forEach((element) => element.style.display = "none");
    // bring user's info to the text input field
    edit_info.forEach((element, index) => {  element.type  = "text"; element.value = info[index].innerHTML; } );
    // make button visible if user wants to edit info
    buttons.forEach((button) => button.style.visibility = "visible");
});

// cancel button
buttons[0].addEventListener('click', () => {
    info.map((element)      => element.removeAttribute("style") );
    edit_info.map((element) => element.type = "hidden");
    buttons.map((element)   => element.style.visibility = "hidden");
});

// save button 
buttons[1].addEventListener('click', () => {
    info.map((element, index)   => { element.removeAttribute("style"); element.innerHTML = edit_info[index].value } );
    edit_info.forEach((element) => element.type  = "hidden" );
    buttons.forEach((button)    => button.style.visibility = "hidden");
});


// below is where the profile page is being render
async function renderProfile() {
    const userName = window.location.href.split("/")[4];
    try {
        let userInfo   = await fetch(`http://localhost:3000/userinfo/${userName}`);
        userInfo       = await userInfo.json();
        console.log(userInfo);
    } catch (error) {
        console.error(error);
    }
        
    
}


await renderProfile();

