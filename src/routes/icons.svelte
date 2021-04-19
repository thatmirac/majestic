<script context="module" lang="ts">
	export async function preload() {
		const res = await this.fetch('api/icons');
		const lookup: { data: [{ name: string, preview: string, asset: string }]} = await res.json();
		const icons = lookup.data.map(object => {
			return {
				name: object.name,
				preview: `https://cms.tale.me/assets/${object.preview}?quality=50`,
				asset: `https://cms.tale.me/assets/${object.asset}?download`
			}
		});
	
		return { icons };
	}
</script>

<script lang="ts">
	export let icons: [{ name: string, preview: string, asset: string }];
</script>

<div class="icons-container">
	<div class="mobile-notice">
		<img src="./assets/info.svg" alt="Information" id="info">
		<p>To download an icon, please visit this page on a desktop computer.</p>
	</div>
	<h1>ICONS</h1>
	<div class="icon-grid">
		{#each icons as icon}
			<div id="interaction-prevention" />
			<div class="icon">
				<a href={icon.asset} download={`${icon.name}.icns`}> <!--needs download link-->
					<img src={icon.preview} alt={`${icon.name} preview`} />
					<p id="name">{icon.name}</p>
					<p id="download-hint">GET</p>
				</a>
			</div>
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
	<title>Icons | madebymirac.com</title>
	<link rel="canonical" href="https://madebymirac.com/icons" />
	<meta name="title" content="Icons | madebymirac.com" />
	<meta
		name="description"
		content="Original madebymirac icons for your Mac" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/icons" />
	<meta property="og:title" content="Icons | madebymirac.com" />
	<meta
		property="og:description"
		content="Original madebymirac icons for your Mac" />
	<meta
		property="og:image"
		content="https://madebymirac.com/assets/card.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://madebymirac.com/icons" />
	<meta property="twitter:title" content="Icons | madebymirac.com" />
	<meta name="twitter:creator" content="@thatmirac" />
	<meta name="twitter:creator:id" content="1153786059718889472" />
	<meta
		property="twitter:description"
		content="Original madebymirac icons for your Mac" />
	<meta
		property="twitter:image"
		content="https://madebymirac.com/assets/card.jpg" />
	<meta name="twitter:image:alt" content="Mirac Logo Card" />
</svelte:head>
