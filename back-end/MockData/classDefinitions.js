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
    constructor(n, adr, pn, nr, desc, hrs){
        this.name = n;
        this.address = adr;
        this.phone = pn;
        this.reviewCount = nr;
        this.description = desc;
        this.hours = hrs;
    }
}

class Review {
    constructor(revId, pt, user, stars, desc, fq, custServ, atmo, health, seats, t){
        this.id = revId;
        this.postTime = pt;
        this.userId = user;
        this.overall = stars;
        this.description = desc;
        this.foodQuality = fq;
        this.customerService = custServ;
        this.atmosphere = atmo;
        this.healthiness = health;
        this.seatAvailability = seats;
        this.taste = t;
    }
}

export {
    DiningHall,
    Review,
    Hours
}