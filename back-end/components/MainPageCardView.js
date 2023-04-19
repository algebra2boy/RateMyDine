import { DiningHallList } from "../MockData/diningHall.js";
const cardGroup = document.getElementById("card-group");

function renderGenerateCardView(name) {
    // construct the column 
    const ColumnView = document.createElement("div");
    ColumnView.classList.add("col");
    ColumnView.classList.add("mb-5");
    
    // constructCard the column 
    const CardView = document.createElement("div");
    CardView.classList.add("card");
    CardView.classList.add("h-100");

    // construct the cardImage 
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("alt", name);
    cardImage.setAttribute("src", `Pictures/${name.toLowerCase()}.jpeg`);

    // construct the cardBody 
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    
    // construct the name of the dining hall, horzontal line and card text
    const h5 = document.createElement("h5"), hr = document.createElement("hr"), cardText = document.createElement("p");
    h5.classList.add("card-title");
    h5.innerHTML = name;
    cardText.classList.add("card-text");
    cardText.innerHTML = "100 reviews";

    // order hierarchical level
    cardBody.appendChild(h5);
    cardBody.appendChild(hr);
    cardBody.appendChild(cardText);

    CardView.appendChild(cardImage);
    CardView.appendChild(cardBody);
    
    ColumnView.appendChild(CardView);
    cardGroup.appendChild(ColumnView);   
}

function renderCardListView() {
    for (let index = 0; index < 6; ++index) {
        const diningHallName = DiningHallList[index];
        renderGenerateCardView(diningHallName);
    }
}

renderCardListView();