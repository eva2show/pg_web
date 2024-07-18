<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	import Auto from "../lib/coms/autoSpin.svelte";
	import Balance from '$lib/coms/balance.svelte';

	let auto_visible = false;
	const showAutoWin = () => {
		auto_visible = !auto_visible;
	}
	export function closeAutoWin(){
		auto_visible = false;
	}

	let balance_visible = false;
	const showBalanceWin = () => {
		balance_visible = !balance_visible;
	}
	export function closeBalanceWin(){
		balance_visible = false;
	}

	

	
</script>

<svelte:head>
	<title>寻宝黄金城</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="moneyline">
		<img src="./icons/balance.png" alt="" class="balance" on:click={showBalanceWin}>
	</div>
	<div class="spinline">
		<div class="spin">
			<img src="./icons/auto.png" alt="" class="auto"  on:click={showAutoWin}>
		</div>
	</div>

	{#if auto_visible}
	     <Auto closeWin={closeAutoWin}/>
    {/if}
	{#if balance_visible}
	     <Balance closeWin={closeBalanceWin}/>
    {/if}



</section>

<style>
	section {
		/* display: flex; */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
	.spinline{
		position: absolute;
		bottom: 16.2%;
		left: 83.5%;
	}
	.auto{
		width: 38.6px
	}
	.balance{
		position: absolute;
		bottom: 25.1%;
		left: 1.5%;
		width: 20px;
	}



</style>
