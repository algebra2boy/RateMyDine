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
                <a href="/" id="title"><p>RateMyDine</p></a>
                <a href="/login">Log in</a>&nbsp;
                <a href="/signup">Sign up</a>
              </div>
            </div>
        </div>
        `;
    }
}

customElements.define('header-component', Header);