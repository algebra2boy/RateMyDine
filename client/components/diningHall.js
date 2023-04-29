//This is the js file responsible for all functionality (barring the footer and header) of the dining.html page

//TODO: Implement uni-directional dataflow; too many fetches are being made

async function loadPageInformation(){
    try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();

        loadUpperHalfText(diningHall);

        loadReviewButton();
        
    }catch{
        console.log("big bad error dont dead open inside")
    }
}


//We need to load comments AFTER the page is loaded, otherwise the elements get broken
//loadComments() => void
async function loadComments(){
    let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
    let diningHall = await res.json();
    let resp = await fetch(`/review/${diningHall.name}`);
    let comments = await resp.json();
    let commentSection = document.getElementById('comment-section');
    let mostRecentComment = document.createElement('comment-component');
    commentSection.appendChild(mostRecentComment);
    fillComment(mostRecentComment, comments.reviews[0], diningHall);
}

function loadUpperHalfText(diningHall){

    //LOADING ONE-OFF TEXT INFORMATION
    document.getElementById('name-row').innerHTML = diningHall.name;
    document.getElementById('dining-address').innerHTML = diningHall.address;
    document.getElementById('dining-phone').innerHTML = diningHall.phone;
    document.getElementById('dining-info').innerHTML = diningHall.description;
    document.getElementById('profile').src = `../../Pictures/${diningHall.name.toLowerCase()}.jpeg`;
    document.getElementById('hourHeader').innerHTML = "Hours:";


    //LOADING HOURS
    let table = document.getElementById('thours').children[0].children;

        for(let elem in table){
            let tr = table[elem]
            for(let child in tr.children){
                let id = undefined;
                if(tr.children[child].tagName === "TD"){
                    tr.children[child].innerHTML = diningHall.hours[tr.children[child].id];
                }
                if(tr.children[child].tagName === "TR" && id != undefined){    
                    tr.children[child].innerHTML = id.charAt(0) + id.slice(1);
                }
            }
        }
}

function loadReviewButton(){
    //Popup window element
    const popUp = document.getElementById("popWindow");

    //Popup input elements
    let inputElements = ["FoodQuality", "CustomerService", "Atmosphere", "Healthiness", "SeatAvailability", "Taste"];
    inputElements = inputElements.map((x) => document.getElementById(x));

    //Create New/Edit a Review opens up the Popup
    document.getElementById("openPopup").addEventListener("click", () => {
        popUp.classList.add("popup-open");
    });
    //Popup Submit button should close the pop-up by removing the class when everything is filled
    document.getElementById("closePopup").addEventListener("click", () => {
        if(!(inputElements.filter((x) => x.value === "").length > 0))
            popUp.classList.remove("popup-open");
    });
    //X button should close the pop-up by removing the class
    document.getElementById("xClose").addEventListener("click", () => {
        popUp.classList.remove("popup-open");
    });
}

//Used to populate individual <comment-component>
//fillComment(comment: <comment-component>, commentData: Review object, diningHall: DiningHall object) => void
function fillComment(comment, commentData, diningHall){

    //Helper function to add the "active" class to each html element that is a star within spec of commentData
    //fillStars(elem: HTML Element, field: string) => void
    function fillStars(elem, field){
        let stars = Array.from(elem.getElementsByClassName("fa-star"));
        stars.length = commentData[field];
        stars.forEach((x) => x.classList.add('active'));
    }

    //POPULATE LEFT CONTAINER EXCEPT OVERALL STARS

    //Handle text
    comment.getElementsByClassName("desc")[0].innerHTML = commentData.description;
    comment.getElementsByClassName('fraction')[0].innerHTML = `${commentData.overall}/5 Stars`
    comment.getElementsByClassName('dining-name')[0].innerHTML = diningHall.name;
    comment.getElementsByClassName('time')[0].innerHTML = `Date published: ${commentData.postTime}`;

    //Handle faces
    let changeFace = (face, rate) => {comment.getElementsByClassName('face')[0].classList.add(face); comment.getElementsByClassName('rating')[0].innerHTML = rate};
    
    if(commentData.overall > 3){
        changeFace('fa-smile', "GREAT!");
    }else if(commentData.overall === 3){
        changeFace('fa-meh', "Meh.");
    }else{
        changeFace('fa-frown', 'Horrible');
    }

    //POPULATE RIGHT CONTAINER (OR RATHER, STARS)
    let x = ['overall', 'foodQuality', 'customerService', 'atmosphere', 'healthiness', 'seatAvailability', 'taste']
    x.forEach((elem) => fillStars(comment.getElementsByClassName(elem)[0], elem));

}

//PAGE LISTENERS
window.onload = (loadPageInformation);
document.addEventListener("DOMContentLoaded", loadComments);