<script>
    import { onMount, onDestroy } from "svelte";
    import svg_first from "../icon/c.svg?raw";
    import svg_g from "../icon/g.svg?raw";

    //  '不  凡   成   就   非   凡';
    // 多语言支持
    export let title = "";

    let logo_p, logo_g;
    let logo_blur_p, logo_blur_g;
    let inload, pre;
    let blur_p_value = {
        stdDeviation: 0,
    };
    let blur_g_value = {
        stdDeviation: 0,
    };


    onMount(() => {

    });

    export const resize = _=>{
        let s = (Math.min(535,window.innerWidth)/249) * 0.43;
        inload.style.transform = `scale(${s})`;

        console.log("inload-resize:",s);
    }

    onDestroy(() => {
        console.log("inloading component is being destroyed");
        blur_p_value = blur_g_value = null;
      
    });
</script>

<div class="initial-loader">
    <div class="svg-loading" bind:this={inload}>
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

                    <g style="transform: translate(0px, 0px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px, -152px);"
                        >{@html svg_first}
                    </g>
                    <g style="transform: translate(0px, -304px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px, -456px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px, -608px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px, -760px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px,-912px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px,-1064px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px,-1216px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px,-1368px);">
                        {@html svg_first}
                    </g>
                    <g style="transform: translate(0px,-1520px);">
                        {@html svg_first}
                    </g>
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
                    <g style="transform: translate(0px, 0px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -152px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -304px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -456px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -608px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -760px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -912px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -1064px);"
                        >{@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -1216px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -1368px);">
                        {@html svg_g}
                    </g>
                    <g style="transform: translate(0px, -1520px);">
                        {@html svg_g}
                    </g>
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
            bind:this={pre}
            class="pre-ani"
            style="font: 20px Roboto, sans-serif; color: rgb(204, 204, 204); opacity: 0; text-align: center;">{title}</pre>
    </div>
</div>

<style>
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
</style>
