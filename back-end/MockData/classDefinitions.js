class DiningHall {
    constructor(n, adr, pn, nr, desc){
        this.name = n;
        this.address = adr;
        this.phone = pn;
        this.reviewCount = nr;
        this.description = desc;
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
    Review
}