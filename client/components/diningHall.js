//This is the js file responsible for all functionality (barring the footer and header) of the dining.html page

async function loadPageInformation(){
    try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();

        let resp = await fetch(`/review/${diningHall.name}`);
        let comments = await resp.json();

        loadUpperHalfText(diningHall);

        loadReviewButton(diningHall);

        loadComments(comments[0], document.getElementById('recent-comment'), diningHall.name);
        
        batchLoadComments(comments, document.getElementById('comment-section'), diningHall.name, 5);

        document.getElementById('see-more').addEventListener('click', () => {
            batchLoadComments(comments, document.getElementById('comment-section'), diningHall.name, 5);
            if(comments.length === 0){
                document.getElementById('see-more').innerHTML = "";
            }
        })
        
    }catch (err){
        console.warn(err);
    }
}

//Loads a specified amount of comments from the array of comments into the specified container.
//batchLoadComments(comments: []Review Object, container: <HTML Object>, diningHallName: string, numComments: int) => void
function batchLoadComments(comments, container, diningHallName, numComments){
    let i = 0;
    while(i < Math.min(comments.length, numComments)){
        loadComments(comments.shift(), container, diningHallName);
        i++;
    }
}

//Loads a comment from the array of comments into the specified container.
//loadComments(comments: Review Object, container: <HTML Object>, diningHallName: string) => void
function loadComments(comment, container, diningHallName){
    let commentComponent = document.createElement('comment-component');
    container.appendChild(commentComponent);
    fillComment(commentComponent, comment, diningHallName);
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
            if(tr.children[child].tagName === "TD"){
                tr.children[child].innerHTML = diningHall.hours[tr.children[child].id];
            }
            if(tr.children[child].tagName === "TH"){ 
                tr.children[child].innerHTML = tr.children[child].id.charAt(0).toUpperCase() + tr.children[child].id.slice(1);
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
    let inputElements = ["FoodQuality", "CustomerService", "Atmosphere", "Healthiness", "SeatAvailability", "Taste", "ReviewDescription"];
    inputElements = inputElements.map((x) => document.getElementById(x));

    async function sendRequest(){
        let options = {
            headers: { "Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(inputElements.reduce((acc, e) => {acc[e.id] = e.value; return acc},{reviewer_id: 1236}))
        }
        try{
            let res = await fetch(`/review/${diningHall.name}`, options);
            let data = await res.json();
            let recentCommentContainer = document.getElementById('recent-commment');
            recentCommentContainer.innerHTML = "";
            //THEN USE LOADCOMMENTDATA() TO CREATE A COMMENT
            loadComments(data, recentCommentContainer, diningHall.name);
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
