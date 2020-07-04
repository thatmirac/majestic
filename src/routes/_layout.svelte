<script>
	export let segment;
</script>

<header>
	<div class="logo-container">
		<a href=".">
			<img src="assets/header.png" alt="Home" />
		</a>
	</div>
</header>

<main>
	<slot {segment} />
</main>
