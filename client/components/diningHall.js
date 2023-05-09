//This is the js file responsible for all functionality (barring the footer and header) of the dining.html page

//TODO: Implement uni-directional dataflow; too many fetches are being made

async function loadInformation() {
    try {
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();
        
        console.log(diningHall);

        // LOADING ONE-OFF DISPLAY INFORMATION
        document.getElementById('name-row').innerHTML = diningHall.name;
        document.getElementById('dining-address').innerHTML = diningHall.address;
        document.getElementById('dining-phone').innerHTML = diningHall.phone;
        document.getElementById('dining-info').innerHTML = diningHall.description;
        document.getElementById('profile').src = `../../Pictures/${diningHall.name.toLowerCase()}.jpeg`;
        document.getElementById('hourHeader').innerHTML = "Hours:";

        // LOADING HOUR INFORMATION
        let table = document.getElementById('thours').children[0].children;
        
        //TODO: fix this please using the db 

        // console.log(diningHall.hours)
        for(let element in table){
            let tr = table[element]
            for(let child in tr.children){
                // let id = undefined;
                // if(tr.children[child].tagName === "TD"){
                //     tr.children[child].innerHTML = diningHall.Hours[tr.children[child].id];
                // }
                // if(tr.children[child].tagName === "TR" && id != undefined){    
                //     tr.children[child].innerHTML = id.charAt(0) + id.slice(1);
                // }
            }
        }

        // load map-kit from the google-map
        document.getElementById("map").src = diningHall.mapURL;

    } catch (error) {
        console.log("loadPageInformation is crushing");
        console.log(error);
    }
}


//We need to load comments AFTER the page is loaded, otherwise the elements get broken
//loadComments() => void
async function loadComments(){
    const diningName = window.location.href.split("/")[3];
    let response = await fetch(`/review/${diningName}`);
    let comments = await response.json();
    let commentSection    = document.getElementById('comment-section');
    let mostRecentComment = document.createElement('comment-component');
    commentSection.appendChild(mostRecentComment);
    fillComment(mostRecentComment, comments.reviews[0]);
}

//Used to populate individual <comment-component>
//fillComment(comment: <comment-component>, commentData: Review object) => void
function fillComment(comment, commentData){
    function fillStars(elem, field){
        let stars = elem.getElementsByClassName("fa-star");
        for(let i in stars){
            if(i < commentData[field]){
                stars[i].classList.add('active');
            }
        }
    }

    // retrieve dininng name from the URL
    const diningName = window.location.href.split("/")[3];
    console.log("diningName " + diningName );
    //POPULATE LEFT CONTAINER
    let desc    = comment.getElementsByClassName("desc")[0];
    desc.innerHTML = commentData.description;

    let frac    = comment.getElementsByClassName('fraction')[0];
    frac.innerHTML = `${commentData.overall}/5 Stars`

    let nam     = comment.getElementsByClassName('dining-name')[0];
    nam.innerHTML = diningName;

    // let date    = comment.getElementsByClassName('time')[0];
    // date.innerHTML = `Date: ${commentData.postTime}`;

    //handle faces

    let ovStars     = comment.getElementsByClassName('overall')[0];
    fillStars(ovStars, "overall");


    //POPULATE RIGHT CONTAINER
    let foodQuality = comment.getElementsByClassName('foodQuality')[0];
    let custService = comment.getElementsByClassName('customerService')[0];
    let atmosphere  = comment.getElementsByClassName('atmosphere')[0];
    let healthy     = comment.getElementsByClassName('healthiness')[0];
    let seats       = comment.getElementsByClassName('seatAvailability')[0];
    let taste       = comment.getElementsByClassName('taste')[0];

    fillStars(foodQuality, "foodQuality");
    fillStars(custService, "customerService");
    fillStars(atmosphere, "atmosphere");
    fillStars(healthy, "healthiness");
    fillStars(seats, "seatAvailability");
    fillStars(taste, "taste");
}

async function loadPage() {
    await loadInformation();
    await loadComments();
}

// this is where we load everything from the template
await loadPage();