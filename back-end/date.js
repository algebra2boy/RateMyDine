function currentDate() {
    let todayDate = new Date();
    document.getElementById("time").innerHTML =  `Date: ${todayDate.toLocaleDateString()}`;
    // call the function every 3600000ms, which is 1 hr
    var t = setTimeout(currentTime, 3600000);
}

currentDate();