import { DiningHallList } from "./diningHall.js"
function currentTime() {
    let todayDate = new Date();
    let dayzone = "AM"
    if (todayDate.getHours() > 12) {
        dayzone = "PM";
    }

    let hour = todayDate.getHours(), minute = todayDate.getMinutes(), second = todayDate.getSeconds();
    // format the hour 
    let hh = (String(hour).length === 1) ? "0" + hour : hour;
    let mm = (String(minute).length === 1) ? "0" + minute : minute;
    let ss = (String(second).length === 1) ? "0" + second : second;

    let time = hh + ":" + mm + ":" + ss + " " + dayzone;
    document.getElementById("search-box").placeholder = "Scroll to rate at " + time;
    // call the function every 1000ms, which is 1 second
    var t = setTimeout(currentTime, 1000);
}

currentTime();