<script lang="ts">
	export let segment: string;
</script>

<header>
	<div class="logo-container">
		<a href="/wallpapers/">
			<img src="assets/header.png" alt="Home" />
		</a>
	</div>
</header>

<main>
	<slot {segment} />
</main>