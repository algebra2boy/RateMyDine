//This file is the template for all comment objects (the grey block and anything inside it under the "Most recent review" section in dining.html
//diningHall.js and dining.html require this file

// define a comment class
class comment extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="comment" 
            style="
            display: inline-grid; 
            grid-template-columns: 1fr 1fr; 
            grid-template-rows: 1fr;
            background-color: rgb(248, 248, 248);
            border-radius: 10px;
            height: 300px;
            width: 800px;
            justify-items: center;
            padding: 30px;
        ">

            <div class="left-container" style="width: 450px;">

                <div class="row word">
                    <div class="column dining-name">Hampshire</div>

                    <div class="column emoji">
                    <i class="far face"></i>
                    <span class="rating" id="rating">GREAT!</span>
                    </div>

                    <div class="column fraction">5/5 Stars</div>

                    <div class="column overall" style="position: relative; right: 30px;">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="column big-column desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore reprehenderit ex
                    rerum harum laboriosam illum repellat molestias ullam eum libero quam neque, sunt inventore. Fugit quisquam a
                    maxime autem odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
                </div>

                <div class="row">
                    <div style="text-align:left; position: relative; bottom: 10%; left: 0;" class="column time" id="time">Date: 4/21/2023</div>
                </div>
            </div>
            
            <div class="right-container" style="width: 450px;">
                
                <table class="rank">
                <tbody><tr class="food-quality">
                <td>Food Quality</td>
                <td class="foodQuality">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="customer-service">
                <td>Customer Service</td>
                <td class="customerService">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="atmo-sphere">
                <td>Atmosphere</td>
                <td class="atmosphere">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="healthy">
                <td>Healthiness</td>
                <td class="healthiness">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="seat-availability">
                <td>Seat Availability</td>
                <td class="seatAvailability">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="tas">
                <td>Taste</td>
                <td class="taste">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
            </tbody></table>

            </div>
        </div>
        `;
    }
}

customElements.define('comment-component', comment);