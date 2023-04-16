// define a header class
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 banner">
                <img src="../../Pictures/logo.png" class="img-fluid" alt="RMD Logo">
                <p id="title">RateMyDine</p>
                <a href="front-end/HTML/login.html">Log in</a>&nbsp;
                <a href="front-end/HTML/signup.html">Sign up</a>
              </div>
            </div>
        </div>
        `;
    }
}

customElements.define('header-component', Header);