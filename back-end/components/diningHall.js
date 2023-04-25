//redirect to dining hall page + load information on dining hall + handle review loading

//get dining hall name from url
//fetch dining hall information from database and update the page

; //this is so stupid someone please fix this

async function loadPageInformation(){
    try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();
        console.log(diningHall);
        let nameRow = document.getElementById('name-row');
        let addr = document.getElementById('dining-address');
        let phone = document.getElementById('dining-phone');
        let info = document.getElementById('dining-info');
        let pic = document.getElementById('profile');

        //LOADING  
        nameRow.innerHTML = diningHall.name;
        addr.innerHTML = diningHall.address;
        phone.innerHTML = diningHall.phone;
        info.innerHTML = diningHall.description;
        pic.src = `../../Pictures/${diningHall.name.toLowerCase()}.jpeg`;

        // //LOADING HOUR INFORMATION
        // for(let child of document.querySelectorAll('.time-hour')){
        //     child.innerHTML = diningHall.hours[child.id];
        // }
        
    }catch{
        console.log("THE HELL HAPPENED???")
    }
}


//trust me i tried working them into the same function; didnt work
async function loadComments(){
    let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
    let diningHall = await res.json();
    let resp = await fetch(`/review/${diningHall.name}`);
    let comments = await resp.json();
    let commentSection = document.getElementById('comment-section');
    let mostRecentComment = document.createElement('comment-component');
    commentSection.appendChild(mostRecentComment);

    fillComment(mostRecentComment, comments.reviews[0]);
}

function fillComment(comment, commentData){
    function fillStars(elem){
        
    }

    //POPULATE LEFT CONTAINER
    let ovStars     = comment.getElementsByClassName('stars')[0];
    fillStars()


    //POPULATE RIGHT CONTAINER
    let foodQuality = comment.getElementsByClassName('food-quality-rating')[0];
    let custService = comment.getElementsByClassName('customer-service-rating')[0];
    let atmosphere  = comment.getElementsByClassName('atmosphere-rating')[0];
    let healthy     = comment.getElementsByClassName('healthiness')[0];
    let seats       = comment.getElementsByClassName('seat-availability')[0];
    
    


}

//LISTENERS
window.onload = (loadPageInformation);
document.addEventListener("DOMContentLoaded", loadComments);