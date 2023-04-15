function currentTime() {
    let todayDate = new Date();
    let dayzone = "AM"
    if (todayDate.getHours() > 12) {
        dayzone = "PM";
    }
    let time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds() + " " + dayzone;
    document.getElementById("search-box").placeholder = "Rating My Dining Hall At " + time;
    // call the function every 1000ms, which is 1 second
    var t = setTimeout(currentTime, 1000);
}

currentTime();