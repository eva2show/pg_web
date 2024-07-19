<script>
	import Header from './Header.svelte';
	import '../app.css';


</script>

<div class="app">
	<main>
		<slot />
	</main>



</div>

<style>
	.app {
		background-image: url("../lib/images/bg.jpg");
		background-position: center,center;
		background-size: contain;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}


</style>
