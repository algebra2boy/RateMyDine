// loads a specified amount of comments from the array of comments into the specified container and removes them from the comment list.
// batchLoadComments(comments[]: Review Object, container: <HTML Object>, diningHallName: string, numComments: int) => void
function batchLoadComments(comments, container, diningHallName, numComments){
    let i = 0;
    const numLoad = Math.min(comments.length, numComments);
    while(i < numLoad){
        loadComments(comments.shift(), container, diningHallName);
        i++;
    }
}

//Loads a comment from the array of comments into the specified container.
//loadComments(comments: Review Object, container: <HTML Object>, diningHallName: string) => void
function loadComments(comment, container, diningHallName){
    let commentComponent = document.createElement('comment-component');
    container.appendChild(commentComponent);
    fillComment(commentComponent, comment, diningHallName);
}

//Loads all elements from the array of comments into the specified container.
//loadAllComments(comments[]: Review Object, container: <HTML Object>) => void
function loadAllComments(comments, container){
    let length = comments.length;
    for (let i = 0; i < length; ++i) {
        let comment = comments.shift();
        loadComments(comment, container, comment.location);
    }
}

// used to populate individual <comment-component>
// fillComment(comment: <comment-component>, commentData: Review object, diningHall: DiningHall object) => void
function fillComment(comment, commentData, diningHall){

    // helper function to add the "active" class to each html element that is a star within spec of commentData
    // fillStars(elem: HTML Element, field: string) => void
    function fillStars(elem, field){
        let stars = Array.from(elem.getElementsByClassName("fa-star"));
        stars.length = commentData[field];
        stars.forEach((x) => x.classList.add('active'));
    }

    // POPULATE LEFT CONTAINER EXCEPT OVERALL STARS

    // Handle text
    comment.getElementsByClassName("desc")[0].innerHTML          = commentData.description;
    comment.getElementsByClassName('fraction')[0].innerHTML      = `${commentData.overall}/5 Stars`
    comment.getElementsByClassName('dining-name')[0].innerHTML   = diningHall;
    comment.getElementsByClassName('time')[0].innerHTML          = `Date published: ${commentData.review_date}`;
    comment.getElementsByClassName('reviewID')[0].innerHTML      = `ID: ${commentData.review_ID}`;

    // Handle faces
    let changeFace = (face, rate) => {
        comment.getElementsByClassName('face')[0].classList.add(face); 
        comment.getElementsByClassName('rating')[0].innerHTML = rate;
    };
    
    if (commentData.overall > 3){
        changeFace('fa-smile', "GREAT!");
    } else if (commentData.overall === 3){
        changeFace('fa-meh', "Meh.");
    } else {
        changeFace('fa-frown', 'Horrible');
    }

    //POPULATE RIGHT CONTAINER (OR RATHER, STARS)
    let x = ['overall', 'foodQuality', 'customerService', 'atmosphere', 'healthiness', 'seatAvailability', 'taste']
    x.forEach((elem) => fillStars(comment.getElementsByClassName(elem)[0], elem));

}

export {loadComments, batchLoadComments, loadAllComments }