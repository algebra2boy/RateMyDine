// This contains a list of UMass Dinning Hall
import { DiningHallList } from "./diningHall.js";

const searchBar = document.getElementById("search-box");
const dropDownBox = document.getElementById("dropdown");

// Considering the user's input, then generate a list of dinning hall suggestions
function generateSuggestions() {
    // clean the drop down box every time it gets rendered 
    dropDownBox.innerHTML = "";
    const searchBarValue = searchBar.value;
    
    if (searchBarValue.length === 0) {
        return;
    }

    // find matching items
    const potential_dinningHall = DiningHallList.filter(element => {
        const lowerCaseValue = searchBarValue.toLowerCase();
        // exact word
        if (lowerCaseValue === element.toLowerCase()) {
            return true;
        // check word by word
        } else if (lowerCaseValue.length >= 0 && element.length >= 0 && element.toLowerCase().substring(0, lowerCaseValue.length).includes(lowerCaseValue)) {
            return true;
        }
        return false;
    });

    // generate a list of li elesment to display on the screen
    for (let item = 0; item < potential_dinningHall.length; ++item) {
        let prediction = document.createElement("li");
        prediction.innerHTML = potential_dinningHall[item];
        dropDownBox.appendChild(prediction);
    }
}

// add event listener to the search bar
searchBar.addEventListener("keyup", generateSuggestions);