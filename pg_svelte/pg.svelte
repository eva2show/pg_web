<svelte:options customElement="pg-element" />
<script>
    import "./base.css";
    // import Inloading from "./pg_inloading.svelte";
    import CG_Inloading from "./cg_inloading.svelte";
    import Loading from "./pg_loading.svelte";
    import Content from "./pg_connect.svelte";

    import { onMount } from "svelte";
    let body;
    let inloading,loading;
    let inloading_title = "不  凡   成   就   非   凡";

    let max_ratio = 0.56;
    let min_ratio = 0.46;
    let view = { width: 756, height: 1638 };
    view.ratio = view.width / view.height;

    onMount(() => {

    });

    export const resize = (_) => {
        let rect = document.body.getBoundingClientRect();
        const { width, height } = rect;

        const ratio = width / height;
        let gameWidth = width,
            gameHeight = height;

        if (ratio < min_ratio) {
            gameHeight = width / view.ratio;
        } else if (ratio > max_ratio) {
            gameWidth = height * max_ratio;
        }

        console.log(`ratio:${ratio},w:${gameWidth},h:${gameHeight}`);

        if(body){
            body.style.width = `${gameWidth}px`;
            body.style.height = `${gameHeight}px`;
        }
      
        inloading?.resize();
        loading?.resize(gameWidth,gameHeight);
    };
</script>

<Content/>

<div class="gm-app">
    <div class="background-img"></div>
    <div class="gm-body" bind:this={body}>
        <Loading bind:this={loading}/>
    </div>
    
    <CG_Inloading title={inloading_title} bind:this={inloading}/>
    <!-- <Inloading title={inloading_title} bind:this={inloading}/> -->
</div>

<style>
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
        position: fixed;
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
    }
</style>
