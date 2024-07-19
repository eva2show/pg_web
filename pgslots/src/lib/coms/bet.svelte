<script>
 	import { fly } from "svelte/transition";
    export let closeWin;



</script>

<div 
    transition:fly={{y: "50vh", opacity: 0.5, duration: 500}}
    class="min"
    >
    <div class="topline">
      <span class="bet">投注设置</span>
      <img src="./icons/ic_close.png" alt="" class="ic_close" on:click={closeWin}>
    </div>
  
</div>


<style>
   .min{
	width: 100%;
	height: 60vh;
	position: absolute;
	bottom: 0;
    left: 0;
	/* z-index: 99; */
	background-color: #30303B;
	color: #fff;
   }
   .ic_close{
    position: absolute;
    top: 15px;
    right: 5px;
    height: 45px;
   }
   .bet{
     position: absolute;
     left: 40%;
     font-size: 23px;
     top: 4%;
   }
</style>