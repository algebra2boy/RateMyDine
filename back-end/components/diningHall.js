//redirect to dining hall page + load information on dining hall + handle review loading

//get dining hall name from url
//fetch dining hall information from database and update the page

async function loadPageInformation(){
    try{
        // let res2 = await fetch("/allReviews", {method: "POST"});
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();

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

        //LOADING HOUR INFORMATION
        for(let child of document.querySelectorAll('.time-hour')){
            let t1 = diningHall.hours[child.id][0] > 12 ? diningHall.hours[child.id][0].toString() + "AM" : (diningHall.hours[child.id][0] - 12).toString() + "PM";
            let t2 = diningHall.hours[child.id][1] > 12 ? diningHall.hours[child.id][1].toString() + "AM" : (diningHall.hours[child.id][1] - 12).toString() + "PM";
            child.innerHTML = `${t1}-${t2}`;
        }
        
    }catch{
        console.log("THE HELL HAPPENED???")
    }
}

window.onload = (loadPageInformation);