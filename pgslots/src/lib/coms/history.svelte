<script>
 	import { fly } from "svelte/transition";
    export let closeWin;



</script>

<div 
    transition:fly={{y: "50vh", opacity: 0.5, duration: 300}}
    class="min"
    >
  <span class="autospin">历史记录</span>
  <img src="./icons/ic_close.png" alt="" class="ic_close" on:click={closeWin}>
</div>


<style>
   .min{
	width: 100%;
	height: 100vh;
	position: absolute;
	bottom: 0;
    left: 0;
	/* z-index: 99; */
	background-color: #30303B;
	color: #fff;
   }
   .ic_close{
    position: absolute;
    right: 5px;
    height: 50px;
   }
   .autospin{
    
   }
</style>