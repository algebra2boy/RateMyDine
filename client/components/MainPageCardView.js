// UI Element 
const cardGroup = document.getElementById("card-group");

// This function is responsible for generating the cards (html elements) you see in the middle section of the page just below the search bar
// renderGenerateCardView(diningHall: DiningHall object) => <HTML Element>
function renderGenerateCardView(diningHall) {
    // construct the column 
    const ColumnView = document.createElement("div");
    ColumnView.classList.add("col");
    ColumnView.classList.add("mb-5");
    
    // construct the card view
    const CardView = document.createElement("div");
    CardView.classList.add("card");
    CardView.classList.add("h-100");

    // construct the cardImage 
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("alt", diningHall.DiningName);
    cardImage.setAttribute("src", `Pictures/${diningHall.DiningName.toLowerCase()}.jpeg`);

    // construct the cardBody 
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    // construct the diningHallName of the dining hall, horzontal line and card text
    const h5 = document.createElement("h5"), hr = document.createElement("hr"), cardText = document.createElement("p");
    h5.classList.add("card-title");
    h5.innerHTML = diningHall.DiningName;
    cardText.classList.add("card-text");
    cardText.innerHTML = `${diningHall.numReviews} reviews`;

    // add element to the card body
    cardBody.appendChild(h5);
    cardBody.appendChild(hr);
    cardBody.appendChild(cardText);

    CardView.appendChild(cardImage);
    CardView.appendChild(cardBody);
    
    ColumnView.appendChild(CardView);
    cardGroup.appendChild(ColumnView); 
    
    return ColumnView;
}

// Handles the placement of the html object and redirect hooks for each individual dining hall
// renderCardListView() => void
async function renderCardListView() {
    const diningHallInfo = await fetch("http://localhost:3000/diningInfo");
    const diningHallInfoJSON = await diningHallInfo.json();
    for (let index = 0; index < diningHallInfoJSON.length; ++index) {
        const diningHall = diningHallInfoJSON[index];
        const card = renderGenerateCardView(diningHall);
        card.addEventListener("click", () => window.location=`/${diningHall.DiningName}`);
    }
}


await renderCardListView();