//redirect to dining hall page + load information on dining hall + handle review loading

//get dining hall name from url
//fetch dining hall information from database and update the page

async function loadPageInformation(){
    let res = await fetch(`/info/${window.location.href.split("/")[3]}`);
    console.log(res);
}

window.onload = (loadPageInformation);