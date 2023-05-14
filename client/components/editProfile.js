const edit_name = document.getElementById('edit-name');
const edit_user = document.getElementById('edit-user');
const edit_email = document.getElementById('edit-email');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const user = document.getElementById('user');
const cancel = document.getElementById("cancel");
const save = document.getElementById("save");

document.getElementById('edit-info').addEventListener('click', () => {
    fullName.setAttribute("style", "display:none;");
    edit_name.setAttribute("type", "text");
    edit_name.setAttribute("value", fullName.innerHTML);

    email.setAttribute("style", "display:none;");
    edit_email.setAttribute("type", "text");
    edit_email.setAttribute("value", email.innerHTML);
    user.setAttribute("style", "display:none;");
    edit_user.setAttribute("type", "text");
    edit_user.setAttribute("value", user.innerHTML);

    cancel.setAttribute("style", "visibility:visible;")
    save.setAttribute("style", "visibility:visible;")
});

cancel.addEventListener('click', () => {
    fullName.removeAttribute("style");
    edit_name.setAttribute("type", "hidden");

    email.removeAttribute("style");
    edit_email.setAttribute("type", "hidden");

    user.removeAttribute("style");
    edit_user.setAttribute("type", "hidden");

    cancel.setAttribute("style", "visibility:hidden;")
    save.setAttribute("style", "visibility:hidden;")
});

save.addEventListener('click', () => {
    fullName.removeAttribute("style");
    fullName.innerHTML = edit_name.value;
    edit_name.setAttribute("type", "hidden");

    email.removeAttribute("style");
    email.innerHTML = edit_email.value;
    edit_email.setAttribute("type", "hidden");

    user.removeAttribute("style");
    user.innerHTML = edit_user.value;
    edit_user.setAttribute("type", "hidden");

    cancel.setAttribute("style", "visibility:hidden;")
    save.setAttribute("style", "visibility:hidden;")
});

