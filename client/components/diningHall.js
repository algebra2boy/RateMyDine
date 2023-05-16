//This is the js file responsible for all functionality (barring the footer and header) of the dining.html page

/* an example of diningHall in line 32 : 
{
  "address": "669 North Pleasent Street, Amherst MA 01003",
  "phone": "413-545-2143",
  "description": "The new Worcester Commons, opened Fall 2020, is a state of the art facility featuring a “Food Hall” design. Worcester’s globally inspired menu, 12 action stations, teaching kitchen, Grab'N Go, retail café and restaurant will operate from 7am to midnight seven days a week. Worcester Commons is located in the Northeast Residential Area and is handicapped accessible.",
  "numReviews": 15,
  "name": "Worcester",
  "mapURL": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6017.160208289527!2d-72.52618501744388!3d42.39229095531125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6d279b7905b2f%3A0xbc52d728d8533ae1!2sWorcester%20Commons!5e0!3m2!1sen!2sus!4v1683657855669!5m2!1sen!2sus",
  "hours": {
    sunday      : "7AM-12AM",
    monday      : "7AM-12AM",
    tuesday     : "7AM-12AM",
    wednesday   : "7AM-12AM",
    thursday    : "7AM-12AM",
    friday      : "7AM-12AM",
    saturday    : "7AM-12AM"
  }
}
*/

/*
an example of comment in line 33:
[
    {
      "reviewID": 1248,
      "review_date": "Sun May 14 2023",
      "reviewer_id": "ABCDED",
      "description": "Food is not bad. Feel that finding seats can be difficult, have to make sure that you include additional time just to find seats.",
      "overall": 4,
      "FoodQuality": "4",
      "CustomerService": "4",
      "Atmosphere": "4",
      "Healthiness": "3",
      "SeatAvailability": "2",
      "Taste": "3"
    }
]
*/

async function loadPageInformation(){
    try {
        const diningHallName = window.location.href.split("/")[3];
        const [diningHallResponse, reviewsResponse] = await Promise.all([
            fetch(`/info/${diningHallName}`),
            fetch(`/review/${diningHallName}`)
        ]);

        let diningHall = await diningHallResponse.json(); // this receives a DiningHall object
        let comments   = await reviewsResponse.json();

        console.log(comments);
        
        loadUpperHalfText(diningHall);

        loadReviewButton(diningHall);

        loadComments(comments[0], document.getElementById('recent-comment'), diningHall.name);
        
        batchLoadComments(comments, document.getElementById('comment-section'), diningHall.name, 5);

        document.getElementById('see-more').addEventListener('click', () => {
            batchLoadComments(comments, document.getElementById('comment-section'), diningHall.name, 5);
            if(comments.length === 0) {
                document.getElementById('see-more').innerHTML = "";
            }
        })

        document.getElementById("map").src = diningHall.mapURL;
        
    } catch (error){
        console.error(error);
    }
}

// loads a specified amount of comments from the array of comments into the specified container and removes them from the comment list.
// batchLoadComments(comments[]: Review Object, container: <HTML Object>, diningHallName: string, numComments: int) => void
function batchLoadComments(comments, container, diningHallName, numComments){
    let i = 0;
    const numLoad = Math.min(comments.length, numComments);
    while(i < numLoad){
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

// loadUpperHalfText(diningHall: diningHall Object) => void
function loadUpperHalfText(diningHall){

    //LOADING ONE-OFF TEXT INFORMATION
    document.getElementById('name-row').innerHTML = diningHall.name;
    document.getElementById('dining-address').innerHTML = diningHall.address;
    document.getElementById('dining-phone').innerHTML = diningHall.phone;
    document.getElementById('dining-info').innerHTML = diningHall.description;
    document.getElementById('profile').src = `../../Pictures/${diningHall.name.toLowerCase()}.jpeg`;
    document.getElementById('hourHeader').innerHTML = "Hours:";

    // LOADING HOURS
    // this get the table body
    let table = document.getElementById('thours').children[0].children;

    // traverse through each table row (7 table row in total)
    for(let element in table){
        let tr = table[element]
        // each table row has a table header (TH) and table description (TD)
        // must access the tagname using upper case  
        for(let child in tr.children){
            child = tr.children[child]
            if(child.tagName === "TH"){ 
                // capitalized the first letter of the day
                child.innerHTML = child.id.charAt(0).toUpperCase() + child.id.slice(1);
            } else if(child.tagName === "TD"){
                child.innerHTML = diningHall.hours[child.id];
            }
        }
    }
}

// loads the review button at the right of "Most Recent Reviews"
// loadReviewButton(diningHall: diningHall Object) => void
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
            // this makes a object whose keys are the id, and values are the numbers if they are rating, string if it is description
            body: JSON.stringify(inputElements.reduce((acc, e) => {acc[e.id] = e.value; return acc}, { reviewer_id: "1236" } ))
        }
        try {
            let response     = await fetch(`/review/${diningHall.name}`, options);
            let reviews      = await response.json();
            
            // load the most recent comment
            let recentCommentContainer = document.getElementById('recent-commment');
            recentCommentContainer.innerHTML = "";
            loadComments(reviews, recentCommentContainer, diningHall.name);
        } catch (error){
            console.error(error);
        }
    }

    // Create New/Edit a review opens up the popup
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
        console.log(inputElements.reduce((acc, e) => {acc[e.id] = e.value; return acc},{reviewer_id: 1236}))
        sendRequest();
        // refresh the page after submitting a review
        location.reload();
    })
    //X button should close the pop-up by removing the class
    document.getElementById("xClose").addEventListener("click", () => {
        popUp.classList.remove("popup-open");
    });
}

// used to populate individual <comment-component>
// fillComment(comment: <comment-component>, commentData: Review object, diningHall: DiningHall object) => void
function fillComment(comment, commentData, diningHall){

    // helper function to add the "active" class to each html element that is a star within spec of commentData
    // fillStars(elem: HTML Element, field: string) => void
    function fillStars(elem, field){
        let stars = Array.from(elem.getElementsByClassName("fa-star"));
        stars.length = commentData[field];
        stars.forEach((x) => x.classList.add('active'));
    }

    // POPULATE LEFT CONTAINER EXCEPT OVERALL STARS

    // Handle text
    comment.getElementsByClassName("desc")[0].innerHTML          = commentData.description;
    comment.getElementsByClassName('fraction')[0].innerHTML      = `${commentData.overall}/5 Stars`
    comment.getElementsByClassName('dining-name')[0].innerHTML   = diningHall;
    comment.getElementsByClassName('time')[0].innerHTML          = `Date published: ${commentData.review_date}`;
    comment.getElementsByClassName('reviewID')[0].innerHTML      = `ID: ${commentData.review_ID}`;

    // Handle faces
    let changeFace = (face, rate) => {
        comment.getElementsByClassName('face')[0].classList.add(face); 
        comment.getElementsByClassName('rating')[0].innerHTML = rate;
    };
    
    if (commentData.overall > 3){
        changeFace('fa-smile', "GREAT!");
    } else if (commentData.overall === 3){
        changeFace('fa-meh', "Meh.");
    } else {
        changeFace('fa-frown', 'Horrible');
    }

    //POPULATE RIGHT CONTAINER (OR RATHER, STARS)
    let x = ['overall', 'foodQuality', 'customerService', 'atmosphere', 'healthiness', 'seatAvailability', 'taste']
    x.forEach((elem) => fillStars(comment.getElementsByClassName(elem)[0], elem));

}

//PAGE LISTENERS
await loadPageInformation();