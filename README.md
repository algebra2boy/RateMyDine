# Team 21 Project 

## RateMyDine

**How to run the website** </br>
```
$ npm install
$ npm run dev
```

Append 4/25: you also need to run a fetch("/allReviews") one to construct the dining hall and comment database for it to display properly

**Team Overview** </br>
| <center>Name</center> | <center>GitHub Username</center> |
| --- | --- |
| <center>Yongye Tan</center> | <center>algebra2boy</center> |
| <center>Ivan Liu</center> | <center>ivliu816</center> |
| <center>Jicheng Li</center> | <center>zuki08</center> |
| <center>Adam Trac</center> | <center>noonbles</center> |

**Innovative Idea** </br>
The platform is going to be similar to RateMyProfessor and Yelp, we will show star ratings than numerical rating and also accept half ratings. There will also be a multitude of rating criterias such as Food Quality, Customer Service, Location, and Price to calculate the Overall rating of the review. However, this platform will be for UMass Students and Faculty to post reviews of UMass Dining Hall food.

**Data** </br>

User Logistics
- User login: stores user login info such as uuid, username, userRole, password, email
- Student: stores UMASS student data such as uuid, username, userRole, password, email
- Faculty: stores UMASS Faculty data such as uuid, username, dining hall they work at, years of work experience 


Website Logistics
- Likes: Users can like or dislike other reviews, shown by a whole number.
- User comments: Users can write comments in the review about the food they ate.
- Images: Users can post images of their plate or surroundings of the dining hall
- Rating: Users can specify the satisfactory level on food quality, customer service, atmosphere and time to spend to find a seat or table.
- Overall Review: Each dining hall has a rating that is calculated using all the ratings from users' posts.


**Functionality** </br>
- Bootstrap front end: The site's styling will be primarily handled using bootstrap
  - User Authentication page: hooks together inputs from the front end and redirects the user after confirming information with the backend
    -Text boxes to record input
  - Landing page: Strictly front end; redirects user to other pages (ex: checking reviews particularly Berkshire dining hall)
    -Clickable tiles centered on the main page that redirect user
    - Search bar in the text box for users to select the dinning hall they want to rate
  - Dining hall pages: Loads images of user-generated pictures stored, comments, dining hall name and picture, etc.
    - Non-interactible dining hall image
    - Text box located at the bottom of the page, on top of a tile stack of comments, for users to upload comments and images of their food
      - Button that prompts the user to upload images if they wish
    - Comment tiles with like/dislike buttons for other users to interact with
    - Small section above comments featuring the most viewed photos, top rated comments, etc.
- MongoDB back end: Stores login information, dining hall ratings, food ratings, comments, comment ratings, images, etc.

**License** </br>
[MIT License] (https://opensource.org/license/mit/)
