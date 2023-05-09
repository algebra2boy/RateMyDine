//This is the js file responsible for all functionality (barring the footer and header) of the dining.html page

async function loadPageInformation(){
    try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();
        
        console.log(diningHall);

        let resp = await fetch(`/review/${diningHall.name}`);
        let comments = await resp.json();

        loadUpperHalfText(diningHall);

        loadReviewButton(diningHall);

        loadComments(comments, document.getElementById('recent-comment'), 1, diningHall.name);


        //TODO: OPTIMIZE THIS USING POP() OR SHIFT() PROBABLY
        let pointer = comments.reviews.length;

        loadComments(comments, document.getElementById('comment-section'), Math.min(pointer, comments.reviews.length), diningHall.name);
        pointer-=5;

        document.getElementById('see-more').addEventListener('click', () => {
            if(pointer < 0){ console.log("WHAT"); return 0;}
            loadComments(comments, document.getElementById('comment-section'), Math.min(pointer, comments.reviews.length), diningHall.name);
            pointer-=5;
        })
        
    }catch (err){
        console.warn(err);
    }
}


//Loads the specified number of comments from the table of comments into the specified container.
//loadComments(comments: []Review Object, container: <HTML Object>, numComments: int) => void
function loadComments(comments, container, numComments, diningHallName){
    for(let i=0; i<numComments; i++){
        let comment = document.createElement('comment-component');
        container.appendChild(comment);
        fillComment(comment, comments.reviews[i], diningHallName);
    }
}

//loadUpperHalfText(diningHall: diningHall Object) => void
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

//Loads the review button at the right of "Most Recent Reviews"
//loadReviewButton(diningHall: diningHall Object) => void
function loadReviewButton(diningHall){
    //Popup window element
    const popUp = document.getElementById("popWindow");

    //Popup input elements
    let inputElements = ["FoodQuality", "CustomerService", "Atmosphere", "Healthiness", "SeatAvailability", "Taste"];
    inputElements = inputElements.map((x) => document.getElementById(x));

    async function sendRequest(){
        let options = {
            headers: { "Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(inputElements.reduce((acc, e) => {acc[e.id] = e.value; return acc},{}))
        }
        try{
            let res = await fetch(`/review/${diningHall.name}`, options);
            let data = await res.json();
            let recentCommentContainer = document.getElementById('recent-commment');
            recentCommentContainer.innerHTML = "";
            //THEN USE LOADCOMMENTDATA() TO CREATE A COMMENT
            
        }catch (err){
            console.warn(err);
        }
    }

    //Create New/Edit a Review opens up the Popup
    document.getElementById("openPopup").addEventListener("click", () => {
        popUp.classList.add("popup-open");       
    });
    //Popup Submit button should close the pop-up by removing the class when everything is filled
    document.getElementById("closePopup").addEventListener("click", () => {
        if(!(inputElements.filter((x) => x.value === "").length > 0)){
            popUp.classList.remove("popup-open");
        }
    });
    document.getElementById("reviewForm").addEventListener("submit", (event) => {
        event.preventDefault();
        sendRequest();
    })
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
    comment.getElementsByClassName('dining-name')[0].innerHTML = diningHall;
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
