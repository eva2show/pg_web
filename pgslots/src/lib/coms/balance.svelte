<script>
 	import { fly } from "svelte/transition";
    export let closeWin;



</script>

<div 
    transition:fly={{y: "50vh", opacity: 0.5, duration: 500}}
    class="min"
    >
    <div class="topline">
      <p class="balance">余额</p>
      <img src="./icons/ic_close.png" alt="" class="ic_close" on:click={closeWin}>
    </div>
  
</div>


<style>
   .min{
	   width: 100%;
	   height: 48vh;
	   position: absolute;
	   bottom: 0;
      left: 0;
	/* z-index: 99; */
	   background-color: #282832;
	   color: #fff;
   }
   .ic_close{
      position: absolute;
      top:15px;
      right: 5px;
      height: 45px;
   }
   .balance{
      position: absolute;
      left: 45%;
      font-size: 23px;
   }
</style>