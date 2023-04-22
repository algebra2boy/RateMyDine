import { Review } from "./classDefinitions.js";

const diningReview = [
    {
        "DiningName": "Worcester",
        "Reviews": [
            new Review("1235", "March 28, 2023", "ABCDED", 5, "Noodle is the best!", 3, 2, 1, 2, 4),
            new Review("1234", "Feb 26, 2023", "ABCDED", 4, "I love ramen!", 4, 4, 4, 4, 4, 4),
        ]
    },
    {
        "DiningName": "Franklin",
        "Reviews": [
            new Review("8889", "March 28, 2023", "ABCDED", 1, "Where is my sushi?", 1, 1, 1, 1, 2, 4),
            new Review("8888", "March 12, 2023", "ABCDED", 2, "I could not find my pho!", 1, 2, 1, 3, 0 ,1),
        ]
    }
]

export {diningReview};