import { LitElement, html, css } from 'lit';
import {ref,createRef} from 'lit/directives/ref.js';

export class PGConnect extends LitElement {

  
  ctitle = createRef();
  cls = createRef();
  __root__ = createRef();
  
  static properties = {
    time: {},
  };


  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
  .content-body {
    pointer-events: none;
    background: #000;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    font-family:
        arial,
        pingfang sc,
        microsoft yahei,
        wenquanyi micro hei,
        sans-serif;
}

.content {
    width: 100%;
    padding: 0 10%;
    min-height: 60%;
    text-align: left;
}

.content-title {
    color: #19bee6;
    font-size: 40px;
    line-height: 50px;
}

.content-line {
    background-color: #19bee6;
    height: 3px;
    width: 100%;
    margin: 12px 0 28px;
}

.content-text {
    font-size: 20px;
    color: #999;
    line-height: 25px;
    text-wrap: wrap;
    margin: 0;
    opacity: 0;
}
.colo > .content-line{
  background-color: #16e593;
}

.colo > .content-text{
  opacity:1;
}

.colo > .content-title{
  color:#16e593;
}

@media screen and (max-width: 768px) {
    .content-text {
        font-size: 2.1vw;
        line-height: 2.5vw;
    }
    .content-title{
        font-size: 4vw;
    line-height: 3vw;
    }
    .content-line {
        margin: 2.5vw 0;
        height: 0.3vw;
    }
}
  `;
  connectedCallback() {
    super.connectedCallback();
    setTimeout(_=>{

      this.ctitle.value.innerText = "CONNECTED  SUCCESSFULLY";
      this.cls.value.classList.add("colo")

    },this.time);

    setTimeout(_=>{
      
      this.__root__.value.remove();
      
    },this.time*2);
  }

    
  constructor() {
    super();
    // Define reactive properties--updating a reactive property causes
    // the component to update.
   
    this.time = 200;
  }

  // The render() method is called any time reactive properties change.
  // Return HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text.
  render() {
    return html`
    <div class="content-body" ${ref(this.__root__)}>
    <div class="content" ${ref(this.cls)}>
        <div ${ref(this.ctitle)} class="content-title">CONNECTING...</div>
        <div class="content-line"></div>
        <pre class="content-text">You're on the best network route vavailable.</pre>
    </div>
</div>
    `;
  }
 
}
customElements.define('pg-connect', PGConnect);
