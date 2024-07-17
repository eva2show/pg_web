import { LitElement, html, css } from 'lit';
import {ref,createRef} from 'lit/directives/ref.js';
import './pg_connect';
import './pg_preloading';

export class PGMain extends LitElement {

  static properties = {
    time: {},
    launch: {},
    color: {},
    bg: {},
  };

  static styles = css`
  .background-img {
    background-image: url(/assets/launch.png);
    background-position: 50%;
    background-size: cover;
    bottom: -10%;
    height: 110%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
}

.gm-app {
    display: flex;
    height: 100%;
    width: 100%;
    background: #aaa;
    justify-content: center;
    align-items: center;
}

.gm-body {
    width: 46vh;
    height: 100vh;
    background: #111;
    user-select: none;
    filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
    position: absolute;
    overflow: hidden;
}
  `;
  connectedCallback() {
    super.connectedCallback();
    
    setTimeout(_=>{
      this._preloading.value.remove();
    },300);
  }

  setGame(cas){
    this._game_body.value.appendChild(cas);
  }
  resize(gameWidth,gameHeight,minHeight,maxHeight){

    minHeight = minHeight||1346;
    maxHeight = maxHeight||1638;
    gameWidth = gameWidth||756;
    gameHeight = gameHeight||1638;

    let viewWidth = this._app_body.value.clientWidth,
    viewHeight = this._app_body.value.clientHeight ;

    
    let width =  viewWidth,
        height = viewHeight;

    const game_ratio = gameWidth/gameHeight;
    const view_ratio = viewWidth/viewHeight;
    let min_ratio = gameWidth/ maxHeight;
    let max_ratio = gameWidth/ minHeight;
        
    if (view_ratio < min_ratio ) {

        height = viewWidth / game_ratio;
        width = viewWidth;
    } else if (view_ratio > max_ratio) {

        width = viewHeight * max_ratio;
        height = viewHeight;

    }else{

        width = viewHeight * view_ratio;
        height = viewHeight;
    }


    // console.log(`========resize
    
    // viewWidth:${viewWidth},
    // viewHeight:${viewHeight},
    // `)

    this._game_body.value.style.cssText = `width:${width}px;height:${height}px;`
  }
  
  ready(){

  }
    
  constructor() {
    super();
    this.time = 200;

    this.launch = "";
    this.color = "";
    this.lbg = "";
  }
  _game_body = createRef();
  _app_body = createRef();
  _preloading = createRef();

  render() {
    return html`
    <pg-connect class="full" time="150"></pg-connect>
    <pg-preloading ${ref(this._preloading)} title="不  凡   成   就   非   凡" class="full" usecg="false" begin="400"></pg-preloading>
    <div class="gm-app" ${ref(this._app_body)}>
    <div class="background-img" style="background-image: url(${this.launch});"></div>
    <div class="gm-body" ${ref(this._game_body)}>
    </div>
    
</div>
    `;
  }
 
}
customElements.define('pg-main', PGMain);
