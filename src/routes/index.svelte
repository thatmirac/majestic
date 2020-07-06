<script>
	import { onMount } from 'svelte';
	import { goto } from '@sapper/app';
	onMount(() => {
		goto('wallpapers/');
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Home | madebymirac.com</title>
	<link rel="canonical" href="https://madebymirac.com/" />
	<meta name="title" content="Home | madebymirac.com" />
	<meta
		name="description"
		content="Home of original content that has been thoughtfully planned and
		designed by Mirac." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/" />
	<meta property="og:title" content="Home | madebymirac.com" />
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
	<meta property="twitter:title" content="Home | madebymirac.com" />
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
