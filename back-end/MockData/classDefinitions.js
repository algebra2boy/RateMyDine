//all fields for the Hours class are made of a tuple of 2 integers; represents time in 24hr format. Ex: (7, 21) => 7AM - 9PM
class Hours {
    constructor(sun, mon, tues, wed, thurs, fri, sat){
        this.sunday = sun;
        this.monday = mon;
        this.tuesday = tues;
        this.wednesday = wed;
        this.thursday = thurs;
        this.friday = fri;
        this.saturday = sat;
    }
}

class DiningHall {
    constructor(name, address, phone, reviewCount, description) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.reviewCount = reviewCount;
        this.description = description;
    }
}

class Review {
    constructor(reviewID, postTime, userID, overAllStars, description, foodQuality, customerService, atmosphere, healthiness, seatAvailability, taste) {
        this.id = reviewID;
        this.postTime = postTime;
        this.userId = userID;
        this.overall = overAllStars;
        this.description = description;
        this.foodQuality = foodQuality;
        this.customerService = customerService;
        this.atmosphere = atmosphere;
        this.healthiness = healthiness;
        this.seatAvailability = seatAvailability;
        this.taste = taste;
    }
}

export {
    DiningHall,
    Review,
    Hours
}