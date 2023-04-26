let popUp = document.getElementById("popWindow");

document.getElementById("openPopup").addEventListener("click", () => {
    popUp.classList.add("popup-open");
});

document.getElementById("closePopup").addEventListener("click", () => {
    popUp.classList.remove("popup-open");
});

document.getElementById("xClose").addEventListener("click", () => {
    popUp.classList.remove("popup-open");
});