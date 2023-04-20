// define a footer class
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="container-fluid text-center text-lg-start" style="background-color: maroon">
              <div class="footer">
                <center>
                  <img src="../../Pictures/logo.png" id="footer-logo" alt="logo" class="footer-img-fluid">
                </center>
              </div>
            </div>


            <!-- Copyright -->
            <div>
              <div class="container-fluid text-center text-white p-3" style="background-color: maroon">
                © 2023-2024 RateMyDine All rights reserved.
              </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('footer-component', Footer);