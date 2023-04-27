//Popup window element
const popUp = document.getElementById("popWindow");

//Popup input elements
const fq = document.getElementById("FoodQuality"), cs = document.getElementById("CustomerService"),
atm = document.getElementById("Atmosphere"), health = document.getElementById("Healthiness"),
sa = document.getElementById("SeatAvailability"), t = document.getElementById("Taste");

//Create New/Edit a Review opens up the Popup
document.getElementById("openPopup").addEventListener("click", () => {
    popUp.classList.add("popup-open");
});

//Popup Submit button should close the pop-up by removing the class when everything is filled
document.getElementById("closePopup").addEventListener("click", () => {
    if(fq.value !== "" && cs.value !== "" && atm.value !== "" && health.value !== "" && sa.value !== "" && t.value !== "") {
        popUp.classList.remove("popup-open");
    }
});
//X button should close the pop-up by removing the class
document.getElementById("xClose").addEventListener("click", () => {
    popUp.classList.remove("popup-open");
});