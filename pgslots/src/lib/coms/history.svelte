<script>
 	import { fly } from "svelte/transition";
    export let closeWin;



</script>

<div 
    transition:fly={{y: "50vh", opacity: 0.5, duration: 300}}
    class="min"
    >
    <div class="topline">
      <img src="./icons/date.png" alt="" class="date">
      <p  class="history">历史记录</p>
      <p class="today">今天</p>
		<img src="./icons/close.png" alt=""  class="ic_close" on:click={closeWin}>
   </div>
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
   .topline{
      background-color: #24242E;
      height: 80px;
   }
   .date{
      position: absolute;
      top: 30px;
      height: 20px;
      left: 30px;
   }
   .ic_close{
      position: absolute;
      right: 30px;
      top: 30px;
      height: 20px;
   }
   .history{
      position: absolute;
      left: 44%;
      color: #F7BA65;
   }
   .today{
      position: absolute;
      left: 48%;
      top: 30px;
      color:#B3B3B3;
   }
</style>