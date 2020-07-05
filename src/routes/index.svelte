<script>
	import { onMount } from 'svelte';
	import { goto } from '@sapper/app';
	onMount(() => {
		goto('wallpapers/');
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Made by Mirac</title>
	<link rel="canonical" href="https://madebymirac.com/" />
	<meta name="title" content="Made by Mirac" />
	<meta
		name="description"
		content="Home of original content that has been thoughtfully planned and
		designed by Mirac." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/" />
	<meta property="og:title" content="Made by Mirac" />
	<meta
		property="og:description"
		content="Home of original content that has been thoughtfully planned and
		designed by Mirac." />
	<meta
		property="og:image"
		content="https://madebymirac.com/assets/card.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://madebymirac.com/" />
	<meta property="twitter:title" content="Made by Mirac" />
	<meta name="twitter:creator" content="@thatmirac" />
	<meta name="twitter:creator:id" content="1153786059718889472" />
	<meta
		property="twitter:description"
		content="Home of original content that has been thoughtfully planned and
		designed by Mirac." />
	<meta
		property="twitter:image"
		content="https://madebymirac.com/assets/card.jpg" />
	<meta name="twitter:image:alt" content="Mirac Logo Card" />
</svelte:head>
