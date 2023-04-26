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
    Review
}