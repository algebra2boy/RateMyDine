//redirect to dining hall page + load information on dining hall + handle review loading

//get dining hall name from url
//fetch dining hall information from database and update the page

async function loadPageInformation(){
    try{
        let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
        let diningHall = await res.json();
        let nameRow = document.getElementById('name-row');
        let addr = document.getElementById('dining-address');
        let phone = document.getElementById('dining-phone');
        let info = document.getElementById('dining-info');

        nameRow.innerHTML = diningHall.name;
        addr.innerHTML = diningHall.address;
        phone.innerHTML = diningHall.phone;
        info.innerHTML = diningHall.description;
        
    }catch{
        console.log("THE HELL HAPPENED???")
    }
    
    
}

window.onload = (loadPageInformation);