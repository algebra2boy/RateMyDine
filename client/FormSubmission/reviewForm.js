// UI elements
const reviewForm = document.getElementById("reviewForm");

const foodQuality           = document.getElementById("FoodQuality");
const CustomerService       = document.getElementById("CustomerService");
const Atmosphere            = document.getElementById("Atmosphere");
const Healthiness           = document.getElementById("Healthiness");
const SeatAvailability      = document.getElementById("SeatAvailability");
const Taste                 = document.getElementById("Taste");
const reviewDescription     = document.getElementById("ReviewDescription");


async function reviewFormSubmit(event) {
    event.preventDefault();
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            foodQuality: foodQuality.value,
            CustomerService: CustomerService.value,
            Atmosphere: Atmosphere.value,
            Healthiness: Healthiness.value,
            SeatAvailability: SeatAvailability.value,
            Taste: Taste.value,
            reviewDescription: reviewDescription.value
        })
    };
    const diningHall = window.location.href.split("/")[3];
    const response = await fetch(`http://localhost:3000/review/${diningHall}`, options)
        .then(function () {
            console.log("successully fetching reviewing endpoint")
        }).catch(error => {
            console.log(error);
        });
}

reviewForm.addEventListener("submit", reviewFormSubmit);