<svelte:options customElement="pg-connect" />
<script>
    import { onMount, onDestroy } from "svelte";

    onMount(() => {
        setTimeout((_) => {
        let title = document.getElementById("content-title");
        let line = document.getElementById("content-line");
        let text = document.getElementById("content-text");
        title.innerText = "CONNECTED  SUCCESSFULLY";
        title.style.color = "#16e593";
        line.style.background = "#16e593";
            text.style.opacity = '1';
        }, 200);
        // setTimeout((_) => {
        //     let body = document.getElementById("content-body");
        //     body.remove();
        // },400);
    });
</script>

<div id="content-body">
    <div class="content">
        <div id="content-title">CONNECTING...</div>
        <div id="content-line"></div>
        <pre id="content-text">You're on the best network route vavailable.</pre>
    </div>
</div>

<style>
    #content-body {
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
        position: fixed;
        z-index: 999;
    }

    .content {
        width: 100%;
        padding: 0 10%;
        min-height: 60%;
        text-align: left;
    }

    #content-title {
        content: "CONNECTING...";
        color: #19bee6;
        /* 16E593 */
        font-size: 40px;
        line-height: 50px;
    }

    #content-line {
        background-color: #19bee6;
        height: 3px;
        width: 100%;
        margin: 12px 0 28px;
    }

    #content-text {
        font-size: 20px;
        color: #999;
        line-height: 25px;
        text-wrap: wrap;
        margin: 0;
        opacity: 0;
    }
    @media screen and (max-width: 768px) {
        #content-text {
            font-size: 2.1vw;
            line-height: 2.5vw;
        }
        #content-title{
            font-size: 4vw;
        line-height: 3vw;
        }
        #content-line {
            margin: 2.5vw 0;
            height: 0.3vw;
        }
    }
</style>
