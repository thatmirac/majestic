<script context="module">
	export async function preload({ params, query }) {
		let reference = await this.fetch('wallpapers.json');
		reference = await reference.json();
		reference = reference.reference;

		let wallpapers = await this.fetch(
			`https://wallpapers.prismic.io/api/v2/documents/search?ref=${reference}&orderings=[my.wallpaper.date desc]&pageSize=100`
		);

		wallpapers = await wallpapers.json();
		wallpapers = wallpapers.results;
		return { wallpapers };
	}
</script>

<script>
	export let wallpapers;
</script>

<div class="showcase">
	<span>
		<h1>WALLPAPERS</h1>
		<h2>made by Mirac</h2>
	</span>
</div>
<div class="wallprev-container">
	<div class="wallprev">
		{#each wallpapers as post}
			<a rel="prefetch" href={`wallpapers/${post.uid}`}>
				<img
					src={`${post.data.preview.url.substring(0, post.data.preview.url.indexOf('auto'))}q=80&rect=0,0,368,368&w=191&h=191`}
					alt={post.data.name[0].text} />
			</a>
		{/each}
	</div>
	<div class="copyright-notice">
		<p>All madebymirac content is for personal use only and may not be redistributed or used for any sort of commercial purpose.</p>
	</div>
	<div class="footer">
		<p>©{new Date().getFullYear()}, Mirac</p>
		<a rel="prefetch" href="credits">
			<p>Credits</p>
		</a>
	</div>
</div>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Wallpapers | madebymirac.com</title>
	<link rel="canonical" href="https://madebymirac.com/wallpapers" />
	<meta name="title" content="Wallpapers | madebymirac.com" />
	<meta
		name="description"
		content="Home of original wallpapers designed with love, made by Mirac" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/wallpapers" />
	<meta property="og:title" content="Wallpapers | madebymirac.com" />
	<meta
		property="og:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta
		property="og:image"
		content="https://madebymirac.com/assets/card.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://madebymirac.com/wallpapers" />
	<meta property="twitter:title" content="Wallpapers | madebymirac.com" />
	<meta name="twitter:creator" content="@thatmirac" />
	<meta name="twitter:creator:id" content="1153786059718889472" />
	<meta
		property="twitter:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta
		property="twitter:image"
		content="https://madebymirac.com/assets/card.jpg" />
	<meta name="twitter:image:alt" content="Mirac Logo Card" />
</svelte:head>
