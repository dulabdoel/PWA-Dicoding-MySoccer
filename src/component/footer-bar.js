class footerBar extends HTMLElement {

  connectedCallback() {
    this.attachShadow({
      mode: "open"
    });
    this.render();
  }


  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <style>
p.footer-bottom{
          font-style :oblique;
          font-weight: bold;
        }
p {
  color: #999;
  line-height: 25px;
}
.page-footer{
  background-color :#182f3d49;
  t
}

        </style>
        <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12  ">
                <h5 class="white-text">Soccer Ball</h5>
                <p class="grey-text text-lighten-4">Website Informasi Bola Terupdate</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Subscribe Our News Latter</h5>
                <p>      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates iste sunt quasi aut dolorem vel velit ut
                illo necessitatibus, repudiandae doloribus suscipit quis facilis voluptatem ullam officiis consectetur
                reprehenderit aliquam.</p>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
           <p class="footer-bottom center-align">All Right Reserved &copy:Abdul Rahman_2020</p>
            </div>
          </div>
        </footer>

        `;
  }
}


customElements.define("footer-bar", footerBar);