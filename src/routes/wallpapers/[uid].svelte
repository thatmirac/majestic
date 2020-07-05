<script context="module">
	export async function preload({ params, query }) {
		const uid = params.uid;
		let data = {};
		let previewCard = 'https://madebymirac.com/assets/card.jpg';

		let reference = await this.fetch(`wallpapers/${uid}.json`);
		reference = await reference.json();
		reference = reference.reference;

		let wallpaper = await this.fetch(
			`https://wallpapers.prismic.io/api/v2/documents/search?ref=${reference}&q=[[at(my.wallpaper.uid,"${uid}")]]&fetchLinks=wallpaper.preview,wallpaper.name`
		);

		wallpaper = await wallpaper.json();
		wallpaper = wallpaper.results[0];
		if (wallpaper) {
			let date = (function() {
				let date = new Date(wallpaper.data.date);
				let month = date
					.getMonth()
					.toString()
					.padStart(2, '0');
				let day = date
					.getDate()
					.toString()
					.padStart(2, '0');
				return `${day}.${month}.${date.getFullYear()}`;
			})();

			let credits = wallpaper.data.body.find(slice => {
				return slice.slice_type === 'credits';
			});

			let mobile = wallpaper.data.body1.find(slice => {
				return slice.slice_type === 'mobile_image';
			});

			let tablet = wallpaper.data.body1.find(slice => {
				return slice.slice_type === 'tablet_image';
			});

			let desktop = wallpaper.data.body1.find(slice => {
				return slice.slice_type === 'desktop_image';
			});

			let related = [];
			wallpaper.data.related.forEach(data => {
				if (data.wallpaper.data) {
					related.push({
						name: data.wallpaper.data.name[0].text,
						preview: data.wallpaper.data.preview.url,
						uid: data.wallpaper.uid,
					});
				}
			});

			data = {
				name: wallpaper.data.name[0].text,
				date: date,
				header: wallpaper.data.body1[0].primary.image.url,
				preview: wallpaper.data.preview.url,
				screenshots: wallpaper.data.screenshots,
				related: related,
				credits: credits,
				mobile: mobile,
				tablet: tablet,
				desktop: desktop,
			};

			if (wallpaper.data.preview_card.url) {
				previewCard = wallpaper.data.preview_card.url;
			}
		}

		return { data, uid, previewCard };
	}
</script>

<script>
	export let data;
	export let uid;
	export let previewCard;
</script>

<body>
	<div class="wallprev-container">
		<div class="top-image">
			<div class="top-image-background">
				<img src={data.header} alt={`${data.name} Header`} />
			</div>
			<div class="top-image-overlay" />
			<div class="top-image-elements">
				<div class="title">
					<h1>{data.date}</h1>
					<h2>{data.name}</h2>
				</div>
				<div class="get-button-container">
					<div class="get-button">
						<a
							href="index.html"
							style="color: rgba(255, 255, 255, 0.9);">
							GET
						</a>
					</div>
				</div>
			</div>
		</div>
		{#if data.credits}
			<div class="credits-section">
				<p>{data.credits.primary.text[0].text}</p>
				<div class="user">
					<img
						src={data.credits.primary.image.url}
						alt={data.credits.primary.author[0].text} />
					<a href={data.credits.primary.link.url}>
						{data.credits.primary.author[0].text}
					</a>
				</div>
			</div>
			<div class="seperator" />
		{/if}
		<div class="screenshots-section">
			<div class="subtitle" id="screenshots-title">
				<h1>Preview</h1>
			</div>
			<div class="screenshots-wrapper">
				{#each data.screenshots as shot}
					<img src={shot.image.url} alt={`${data.name} Image`} />
				{/each}
				<div class="spacer" />
			</div>
		</div>
		<div class="seperator" />
		<div class="sizes-section">
			<div class="subtitle">
				<h1>Sizes</h1>
			</div>
			<div class="download-grid">
				{#if data.mobile}
					<div class="download-container-phone">
						<div class="phone">
							<div class="phone-shape" />
							<div class="phone-home-button" />
						</div>
						<div class="resolution">1125 × 2436</div>
						<div class="download-button">
							<a
								href={data.mobile.primary.image.url.slice(0, data.mobile.primary.image.url.indexOf('?auto=compress'))}
								style="color: rgba(255, 255, 255, 0.9);"
								download>
								<p>Download</p>
							</a>
						</div>
					</div>
				{/if}
				{#if data.tablet}
					<div class="download-container-tablet">
						<div class="tablet">
							<div class="tablet-shape" />
							<div class="tablet-home-button" />
						</div>
						<div class="resolution">2388 × 1668</div>
						<div class="download-button">
							<a
								href={data.tablet.primary.image.url}
								style="color: rgba(255, 255, 255, 0.9);"
								download>
								<p>Download</p>
							</a>
						</div>
					</div>
				{/if}
				{#if data.desktop}
					<div class="download-container-computer">
						<div class="computer">
							<div class="computer-shape" />
							<div class="computer-stand" />
						</div>
						<div class="resolution">2560 × 1440</div>
						<div class="download-button" download>
							<a
								href={data.desktop.primary.image.url}
								style="color: rgba(255, 255, 255, 0.9);"
								download>
								<p>Download</p>
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="seperator" />
		{#if data.related.length > 0}
			<div class="related-section">
				<div class="subtitle" id="related-title">
					<h1>More Like This</h1>
				</div>
				<div class="related-wrapper">
					{#each data.related as wallpaper}
						<a href={`/wallpapers/${wallpaper.uid}`}>
							<img
								src={wallpaper.preview}
								alt={`${wallpaper.name} Image`} />
						</a>
					{/each}
					<div class="spacer" />
				</div>
			</div>
			<div class="seperator" />
		{/if}
		<div class="footer" id="wppagefooter">
			<p>©{new Date().getFullYear()}, Mirac</p>
			<a href="/credits">
				<p>Credits</p>
			</a>
		</div>
	</div>
</body>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.name}</title>
	<link rel="canonical" href="https://madebymirac.com/wallpapers/{uid}" />
	<meta name="title" content={data.name} />
	<meta
		name="description"
		content="Home of original wallpapers designed with love, made by Mirac" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/{uid}" />
	<meta property="og:title" content={data.name} />
	<meta
		property="og:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta property="og:image" content={previewCard} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://madebymirac.com/{uid}" />
	<meta property="twitter:title" content={data.name} />
	<meta name="twitter:creator" content="@thatmirac" />
	<meta name="twitter:creator:id" content="1153786059718889472" />
	<meta
		property="twitter:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta property="twitter:image" content={previewCard} />
	<meta name="twitter:image:alt" content="Mirac Logo Card" />
</svelte:head>
