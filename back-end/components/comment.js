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
            background-color: grey;
            border-radius: 10px;
            height: 300px;
            width: 800px;
            justify-items: center;
            padding: 10px;
        ">

            <div class="left-container" style="width: 450px;">

                <div class="row word">
                    <div class="column dining-name">Hampshire</div>

                    <div class="column emoji">
                    <i class="far fa-smile happy"></i>
                    <span>GREAT!</span>
                    </div>

                    <div class="column">5/5 Stars</div>

                    <div class="column stars">
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    <i class="fas fa-star active"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="column big-column">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore reprehenderit ex
                    rerum harum laboriosam illum repellat molestias ullam eum libero quam neque, sunt inventore. Fugit quisquam a
                    maxime autem odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur excepturi ex veniam
                    debitis tempore recusandae, fugiat vel alias sunt voluptas expedita quod? Ipsam deserunt laborum dignissimos
                    quidem illum cumque sit.</div>
                </div>

                <div class="row">
                    <div style="text-align:right" class="column" id="time">Date: 4/21/2023</div>
                </div>

            </div>
            <div class="right-container" style="width: 450px;">
                
                <table class="rank">
                <tbody><tr class="food-quality">
                <td>Food Quality</td>
                <td class="food-quality-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="customer-service">
                <td>Customer Service</td>
                <td class="customer-service-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="atmosphere">
                <td>Atmosphere</td>
                <td class="atmosphere-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="healthiness">
                <td>Healthiness</td>
                <td class="healthiness-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="seat-availability">
                <td>Seat Availability</td>
                <td class="seat-availability-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </td>
                </tr>
                <tr class="seat-availability">
                <td>Taste</td>
                <td class="seat-availability-rating">
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