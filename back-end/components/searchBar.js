// UI diningHalls
const searchBar = document.getElementById("search-box");
const dropDownBox = document.getElementById("dropdown");

// fetching the dining Hall from the json 
const diningHallInfo = await fetch("http://localhost:3000/diningInfo");
const diningHallInfoJSON = await diningHallInfo.json();

// Considering the user's input, then generate a list of dinning hall suggestions
function generateSuggestions() {
    // clean the drop down box every time it gets rendered 
    dropDownBox.innerHTML = "";
    const searchBarValue = searchBar.value;

    if (searchBarValue.length === 0) {
        generateList(diningHallInfoJSON);
        return;
    }

    // find matching items
    const potential_dinningHall = diningHallInfoJSON.filter(diningHall => {
        const lowerCaseValue = searchBarValue.toLowerCase();
        // exact word
        if (lowerCaseValue === diningHall.name.toLowerCase()) {
            return true;
            // check word by word
        } else if (lowerCaseValue.length >= 0 && diningHall.name.length >= 0 && diningHall.name.toLowerCase().substring(0, lowerCaseValue.length).includes(lowerCaseValue)) {
            return true;
        }
        return false;
    });

    // generate a list of li element to display on the screen
    generateList(potential_dinningHall);
}

/**
 * This function generates a <li> </li> html diningHall for the drop down box
 * @param potential_dinningHall {array}
 * Append the li as a child to the drop down box 
 */

function generateList(potential_dinningHall) {
    for (let item = 0; item < potential_dinningHall.length; ++item) {
        const diningHallName = potential_dinningHall[item].name;
        let prediction = document.createElement("li");
        prediction.addEventListener("click", () => window.location = `/${diningHallName}`);
        prediction.innerHTML = diningHallName;
        dropDownBox.appendChild(prediction);
    }
}

// add event listener to the search bar
searchBar.addEventListener("keyup", generateSuggestions);
document.body.addEventListener("click", (event) => {
    if (event.target.id === 'search-box') {
        generateSuggestions();
    } else {
        dropDownBox.innerHTML = "";
    }
})
