import { DiningHall, Hours } from "./classDefinitions.js";


//BATCH OF TESTING DATA FOR INDIVIDUAL DINING HALLS
//This is the table that is responsible for the information being displayed on the dining.html and fetched by diningHall.js
const diningInfo = [
    new DiningHall("Worcester", "669 North Pleasent Street, Amherst MA 01003", "413-545-2143", 0, "The new Worcester Commons, opened Fall 2020, is a state of the art facility featuring a “Food Hall” design. Worcester’s globally inspired menu, 12 action stations, teaching kitchen, Grab'N Go, retail café and restaurant will operate from 7am to midnight seven days a week. Worcester Commons is located in the Northeast Residential Area and is handicapped accessible.", new Hours("7AM-12AM","7AM-12AM","7AM-12AM","7AM-12AM","7AM-12AM","7AM-12AM","7AM-12AM")),
    new DiningHall("Franklin", "260 Stockbridge Rd, Amherst MA 01003", "413-545-5373", 0, "Located in the Central Residential Area, Franklin Dining Commons is famous for its vegan and vegetarian cuisine. Enjoy a continuous, all-you care-to-eat assortment of dining concepts, such as sushi bar, pizza station, international bar, salad bar, stand alone vegetarian station, deli bar and cereal station, as well as many American fare items. In addition, Franklin Dining Commons also features Grab n’Go for those on the run. Certified Kosher Dining is also available at Franklin.", new Hours("7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM")),
    new DiningHall("Bluewall", "1 Campus Center way, Amherst MA 01003", "413-577-8003", 0, "Blue Wall is located on the 2nd floor of the Campus Center. Select locations will be open throughout the summer. Come visit us to see what is open", new Hours("Closed", "11AM-9PM","11AM-9PM","11AM-9PM","11AM-9PM","11AM-9PM","Closed")),
    new DiningHall("Hampshire", "141 Southwest Cir, Amherst MA 01003", "413-577-5160", 0, "The newly renovated state-of-the-art facility has a contemporary New England theme with 12 concepts designed around UMass Dining Services’ four guiding principles: Healthy Eating, Sustainability, World Flavors, and Community.  The goal of Hampshire DC is to be one of the healthiest and most sustainable dining operations in the nation. This will be done through serving minimally processed foods and more plant-based items at peak season, less red meat, more sustainable seafood and healthier oils, fats, and beverages.", new Hours("7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM","7AM-9PM")),
    new DiningHall("Berkshire", "121 Southwest Cir, Amherst MA 01003", "413-545-1175", 0, "Located in the Southwest Residential Area, this award-winning dining commons features  many display cooking area with freshness in mind.  The dining area is divided into 10 distinct food stations, each with its own theme and menu selection, ranging from vegetation to Pan Asian to rotating restaurant-style cuisine.  Open until midnight 7 days a week. Berkshire Dining Commons is handicapped accessible. ", new Hours("11AM-12AM","11AM-12AM","11AM-12AM","11AM-12AM","11AM-12AM","11AM-12AM","11AM-12AM")),
    new DiningHall("babyBerk", "O-hill Bowl, SW Horseshoe, Northeast, and Kennedy", "413-577-1365", 0, "Follow us on twitter @UMassBabyBerk to find our daily schedule or get real time location update on our app. Indulge in a 100% Grass Fed Beef babyBerk Burger, Steak Poutine, or one of our famous vegan Franklin Burgers. babyBerk brings Award Winning UMass dining to you!", new Hours("Closed", "Closed", "7PM-12AM","7PM-12AM","7PM-12AM","7PM-12AM","7PM-12AM"))
]

export {diningInfo};