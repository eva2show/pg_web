import { LitElement, html, css,svg,adoptStyles  } from 'lit';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import svg_c from "../icon/c.svg";
import svg_p from "../icon/c.svg";
import svg_g from "../icon/g.svg";
import {ref,createRef} from 'lit/directives/ref.js';

export class PGPreLoading extends LitElement {
  static properties = {
    title: {},
    usecg:{},
    begin: {}
  };
  ctitle = createRef();

  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
  static styles = css`
  .initial-loader {
    pointer-events: none;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #000;
    height: 100%;
    margin: auto;
    position: fixed;
    width: 100%;
    user-select: none;
    z-index: 99;
}
.pre-ani {
    animation: 1.2s ease-in-out 0s 1 normal forwards running fade-in;
    margin: 20px 0;
}

@keyframes fade-in {
    100% {
        opacity: 1;
    }
}
  `;

  constructor() {
    super();
    // Define reactive properties--updating a reactive property causes
    // the component to update.
    this.title = 'e';
    this.usecg = false;
    this.begin = 400;
  }
  connectedCallback() {
    super.connectedCallback();
    // setTimeout(_=>{
    // },this.begin);
  }
  render() {

    const svg_1 = [];
    const svg_2 = [];
    let svg_first = this.usecg ?svg_c:svg_p;

   
    for (let i = 0, l = 11; i < l; i++) {
      svg_1.push(`<g style="transform: translate(0px, ${-(i * 152)}px);">
      ${svg_first}
  </g>`)
      svg_2.push(`<g style="transform: translate(0px, ${-(i * 152)}px);">
      ${svg_g}
  </g>`)
    }

    const svg_1_icon = svg_1.join('');
    const svg_2_icon = svg_2.join('');

    let s = (Math.min(535,window.innerWidth)/249) * 0.43;

    return html`<div class="initial-loader">
  <div class="svg-loading" style="transform: scale(${s});">
    <svg viewBox="0 0 249 152" style="overflow: hidden; height: 152px;">
        <svg mask="url(#mask-1716218048434)">
            <g
                id="digit-0-1716218048434"
                bind:this={logo_p}
                transform="translate(0, 20)"
                style="filter: url(&quot;#motionFilter-0-1716218048434&quot;);"
            >
                <animateTransform
                    id="ap1"
                    attributeName="transform"
                    type="translate"
                    from="0 20"
                    to="0 1666"
                    dur=".8s"
                    begin=".4s;ap3.end+.8s"
                    keySplines=" 0.5,0 ,0.5,1"
                />
                <animateTransform
                    id="ap2"
                    attributeName="transform"
                    type="translate"
                    from="0 20"
                    to="0 185"
                    dur=".2s"
                    begin="ap1.end"
                    keySplines=" 0.5,0 ,0.7,1"
                />

                <animateTransform
                    id="ap3"
                    attributeName="transform"
                    type="translate"
                    from="0 185"
                    to="0 172"
                    dur=".2s"
                    begin="ap2.end"
                    keySplines=" 0.5,0 ,.3,1"
                />
                ${ unsafeSVG(svg_1_icon)}
            </g>

            <g
                bind:this={logo_g}
                id="digit-1-1716218048434"
                transform="translate(137, 20)"
                style="filter: url(&quot;#motionFilter-1-1716218048434&quot;);"
            >
                <animateTransform
                    id="ag1"
                    attributeName="transform"
                    type="translate"
                    from="137 20"
                    to="137 1666"
                    dur=".8s"
                    begin="0.2s;ag3.end+0.8s"
                    keySplines=" 0.5,0 ,0.5,1"
                />
                <animateTransform
                    id="ag2"
                    attributeName="transform"
                    type="translate"
                    from="137 20"
                    to="137 185"
                    dur=".2s"
                    begin="ag1.end"
                    keySplines=" 0.5,0 ,0.7,1"
                />

                <animateTransform
                    id="ag3"
                    attributeName="transform"
                    type="translate"
                    from="137 185"
                    to="137 172"
                    dur=".2s"
                    begin="ag2.end"
                    keySplines=" 0.5,0,.3,1"
                />
                ${unsafeSVG(svg_2_icon)}
            </g>
        </svg>
        <defs
            ><linearGradient
                id="gradient-1716218048434"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                ><stop offset="0" stop-color="white" stop-opacity="0"
                ></stop><stop
                    offset="0.2"
                    stop-color="white"
                    stop-opacity="1"
                ></stop><stop
                    offset="0.8"
                    stop-color="white"
                    stop-opacity="1"
                ></stop><stop offset="1" stop-color="white" stop-opacity="0"
                ></stop></linearGradient
            ><mask id="mask-1716218048434"
                ><rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#gradient-1716218048434)"
                ></rect></mask
            ><filter
                id="motionFilter-0-1716218048434"
                width="300%"
                x="-100%"
                class="blurValues"
                in="SourceGraphic"
                stdDeviation="0 0"
            >
                <feGaussianBlur stdDeviation="0 0" bind:this={logo_blur_p}>
                    <animate
                        attributename="stdDeviation"
                        from="0 0"
                        to="0 10"
                        dur="0.35s"
                        fill="freeze"
                        id="apb1"
                        begin=".4s;apb2.end+1s"
                    />
                    <animate
                        attributename="stdDeviation"
                        from="0 35"
                        to="0 0"
                        dur="0.65s"
                        fill="freeze"
                        begin="apb1.end"
                        id="apb2"
                    />
                </feGaussianBlur>
            </filter>

            <filter
                id="motionFilter-1-1716218048434"
                width="300%"
                x="-100%"
                class="blurValues"
                in="SourceGraphic"
                stdDeviation="0 0"
                ><feGaussianBlur stdDeviation="0 0" bind:this={logo_blur_g}>
                    <animate
                        attributename="stdDeviation"
                        from="0 0"
                        to="0 10"
                        dur="0.35s"
                        fill="freeze"
                        id="agb1"
                        begin=".2s;agb2.end+1s"
                    />
                    <animate
                        attributename="stdDeviation"
                        from="0 35"
                        to="0 0"
                        dur="0.65s"
                        fill="freeze"
                        begin="agb1.end"
                        id="agb2"
                    />
                </feGaussianBlur></filter
            ></defs
        ></svg
    >
    <pre
        class="pre-ani"
        style="font: 20px Roboto, sans-serif; color: rgb(204, 204, 204); opacity: 0; text-align: center;">${this.title}</pre>
</div>
</div>`;
  }


}
customElements.define('pg-preloading', PGPreLoading);

