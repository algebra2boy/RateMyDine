//redirect to dining hall page + load information on dining hall + handle review loading

//get dining hall name from url
//fetch dining hall information from database and update the page

; //this is so stupid someone please fix this

async function loadPageInformation(){
    // try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();

        //LOADING ONE-OFF DISPLAY INFORMATION
        document.getElementById('name-row').innerHTML = diningHall.name;
        document.getElementById('dining-address').innerHTML = diningHall.address;
        document.getElementById('dining-phone').innerHTML = diningHall.phone;
        document.getElementById('dining-info').innerHTML = diningHall.description;
        document.getElementById('profile').src = `../../Pictures/${diningHall.name.toLowerCase()}.jpeg`;
        document.getElementById('hourHeader').innerHTML = "Hours:";

        // //LOADING HOUR INFORMATION
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
        
    // }catch{
    //     console.log("THE HELL HAPPENED???")
    // }
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