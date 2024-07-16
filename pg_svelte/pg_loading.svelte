<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { linear } from "svelte/easing";
    import svg_animate from "./icons/pg-animate.svg?raw";

    export let animated_text = "高清游戏资源可能略多，建议在WIFI环境下预加载！";
    export let tips_text = "正在加载游戏";
    export let start_text = "开始";
    export let progress = "50%";

    let animated_el, svg_animate_el, logo_c , ft_img;
    let visible = false;
    let body;
    let tid = 0;
    let max_ratio = 0.56;
    let min_ratio = 0.46;

    onMount(() => {
        setTimeout((_) => {
            setText("正在加载游戏");
        }, 2000);
        setText(animated_text);
        waitForElement(svg_animate_el).then((list) => {
            console.log("svg动画插入完成!", list);
        });
        svg_animate_el.innerHTML = svg_animate;
    });

    function setText(text) {
        if (visible == true) {
            visible = false;
            setTimeout((_) => {
                animated_text = text;
                visible = true;
            }, 1000);
        } else {
            animated_text = text;
            visible = true;
        }
    }

    export function resize(w, h) {
        const ratio = w / h;
        const logo_c_config = [24.52 , 52];
        const ft_img_config = [0.02 , 27.5];

        const value =1 - (ratio - min_ratio) / (max_ratio - min_ratio);
        let curH = 640 + 120 * (value);
        let scale = h / curH;

        body.style.height = curH + "px";
        body.style.transform = `scale(${scale})`;

        logo_c.style.bottom = `${logo_c_config[0] + (value* (logo_c_config[1]- logo_c_config[0]))}px`;
        ft_img.style.bottom = `${ft_img_config[0] + (value* (ft_img_config[1]- ft_img_config[0]))}px`;

    }
    function waitForElement(targetNode) {
        return new Promise((resolve, reject) => {
            const observer = new MutationObserver(list=>{
                observer.disconnect();
                resolve(list[0].addedNodes)
            });
            observer.observe(targetNode, { childList: true });
        });
    }
</script>

<div class="loading-body" bind:this={body}>
    <div class="screen_safe_area">
        <div
            id="__startedButton"
            class="start-button-container-port"
            style="background-color: rgb(37, 115, 184); text-shadow: rgb(37, 115, 184) 0px 1px 2px;"
        >
            <div class="start-button-inner"></div>
            <p id="get-started-text" class="start-text-port">{start_text}</p>
        </div>
        <div id="animationTipsContainer" class="animationTipsContainer-port">
            <div class="animated_text_wrap">
                {#if visible}
                    <div
                        bind:this={animated_el}
                        in:fly={{
                            y: 20,
                            opacity: 0,
                            duration: 1000,
                            easing: linear,
                        }}
                        out:fly={{
                            y: -20,
                            opacity: 0,
                            duration: 1000,
                            easing: linear,
                        }}
                        class="animated_text"
                    >
                        {animated_text}
                    </div>
                {/if}
            </div>
        </div>

        <div class="loading-container-port" style="">
            <div
                id="progress-bar-container-port"
                class="progress-bar-container-port"
            >
                <div class="progress-bar-background"></div>
                <div class="progress-bar-fill-container">
                    <div
                        class="progress-bar-fill stripes"
                        style="background-color: rgb(37, 115, 184); width: 50%;"
                    >
                        <div class="top-highlight"></div>
                        <div class="front-highlight"></div>
                    </div>
                </div>
                <div class="progress-bar-outline border-inner"></div>
                <div class="progress-bar-outline border-outer"></div>
            </div>
            <p id="tips-text" class="text-port">
                <span>{tips_text}</span><span class="tips-text-child2"
                    >[{progress}]</span
                >
            </p>
        </div>
    </div>

    <div class="load-footer">
        <div class="ft-mask1"></div>
        <div class="ft-mask2"></div>

        <div class="footer-image-container">
            <div class="footer-copyright-image" bind:this={ft_img}></div>
        </div>
    </div>

    <div class="logo-container" bind:this={logo_c}>
        <img src="/assets/pg_ft_text_zh.png" class="ft-logo-img" />
        <div  bind:this={svg_animate_el}  style="display: flex; flex-direction: column; backface-visibility: hidden; transform: scale(1);"
        ></div>
    </div>
</div>

<style>
    .screen_safe_area {
        height: 640px;
        width: 360px;
        z-index: 2;
        bottom: 0;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
    }
    .start-button-container-port {
        border: 2px solid rgba(0, 0, 0, 0.15);
        border-radius: 8px;

        height: 36px;
        top: 481px;
        width: 156px;

        align-items: center;
        display: flex;
        justify-content: center;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        z-index: 5;
    }
    .start-button-inner {
        background-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0.5),
            hsla(0, 0%, 100%, 0)
        );
        background-origin: border-box;
        border: 0.87px solid hsla(0, 0%, 100%, 0.4);
        border-radius: 6px;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

    .start-text-port {
        font-size: 12px;
        font-weight: 900;
        color: #fff;
        margin: 0;
        padding: 0;
        font-family:
            PingFang SC,
            Microsoft YaHei,
            WenQuanYi Micro Hei,
            sans-serif;
    }
    .load-footer {
        bottom: 0;
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 229px;
        width: 100%;
    }

    .ft-mask1 {
        background-image: linear-gradient(
            180deg,
            rgba(37, 115, 184, 0),
            #2573b8
        );
        width: 100%;
        height: 100%;
        bottom: 0;

        position: absolute;
    }
    .ft-mask2 {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.03), #000);
    }

    .footer-image-container {
        display: flex;
        height: 100%;
        justify-content: center;
        position: absolute;
        width: 100%;
        z-index: 0;
    }

    .footer-copyright-image {
        background-image: url(/assets/bg_ft.png);
        background-position: 50%;
        background-size: cover;
        height: 12px;
        position: absolute;
        transform: scale(0.6);
        width: 480px;
        bottom: 0.02px;
    }

    .logo-container {
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        position: absolute;
        right: 0;
        bottom: 24.52px;
    }

    .ft-logo-img {
        height: 60px;
    }

    .animationTipsContainer-port {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 35px;
        margin: 0 auto;
        position: relative;
        width: 100%;
        top: 515px;
        z-index: 1;
        position: absolute;
    }
    .animated_text_wrap {
        color: #fff;
        font-size: 10px;
        height: 26px;
        line-height: 26px;
        position: relative;
        text-align: center;
        width: 100%;
    }

    .animated_text {
        align-items: center;
        display: flex;
        height: 26px;
        justify-content: center;
        line-height: 13px;
        margin: 0;
        position: absolute;
        width: 100%;
    }

    .loading-body {
        transform-origin: left top;
        transform: scale(1.47778) rotate(0deg);
        width: 360px;
        height: 640px;
        background-image: url(/assets/loading.png);
        background-position: 50%;
        background-size: cover;
        position: absolute;
        font-family:
            PingFang SC,
            Microsoft YaHei,
            WenQuanYi Micro Hei,
            sans-serif;

        touch-action: none;
    }

    .loading-container-port {
        top: 477px;
        align-items: center;
        display: flex;
        flex-direction: column;
        left: 0;
        position: absolute;
        right: 0;
    }
    .progress-bar-container-port {
        background-color: initial;
        height: 13px;
        position: relative;
        width: 212px;
    }

    .text-port {
        text-align: center;
        text-overflow: ellipsis;
        width: 90%;
        color: #fff;
        font-size: 10.3px;
        margin: 0;
        padding: 0;
        margin-top: 4px;
    }
    .tips-text-child2 {
        margin-left: 5px;
    }

    .progress-bar-background {
        background-color: #111;
        border-radius: 3.5px;
        height: 100%;
        position: absolute;
        width: 100%;
    }

    .progress-bar-fill-container {
        bottom: 0.87px;
        left: 0.87px;
        position: absolute;
        right: 0.87px;
        top: 0.87px;
    }

    .progress-bar-fill {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        background-color: #30a2d0;
        background-size: 8.7px 100%;
        border-radius: 3.5px;
        height: 100%;
        position: absolute;
        background-color: rgb(37, 115, 184);
        width: 50%;
    }
    .top-highlight {
        background-color: hsla(0, 0%, 100%, 0.2);
        border-radius: 3.5px 3.5px 0 0;
        height: 50%;
        width: 100%;
        position: absolute;
        transform: translateZ(0);
    }
    .front-highlight {
        background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
        border-radius: 0 3.5px 3.5px 0;
        height: 100%;
        max-width: 20px;
        right: 0;
        width: 50%;
        position: absolute;
        transform: translateZ(0);
    }

    .stripes {
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-name: animate-stripes;
        animation-timing-function: linear;
        background-image: linear-gradient(
            -75deg,
            hsla(0, 0%, 100%, 0) 35%,
            hsla(0, 0%, 100%, 0.1) 0,
            hsla(0, 0%, 100%, 0.1) 75%,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0)
        );
    }

    @keyframes animate-stripes {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 34.7px 0;
        }
    }

    .progress-bar-outline {
        border-radius: 3.5px;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateZ(0);
    }
    .border-outer {
        border: 0.85px solid #111;
    }
    .border-inner {
        border: 1.7px solid #272727;
    }
</style>
