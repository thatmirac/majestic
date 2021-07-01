<script context="module" lang="ts">
	interface ApiData {
		name: string;
		date: string;
		assets: Assets;
		credits?: Credits;
		related: Related[];
	}

	interface Credits {
		text: string;
		link: string;
		image: string;
	}

	interface Assets {
		banner: string;
		mobile?: string;
		desktop?: string;
		screenshots: Screenshot[];
	}

	interface Screenshot {
		id: string;
	}

	interface Related {
		id: string;
		asset: string;
	}

	export async function preload({ params, query }) {
		const uid = params.uid;
		const res = await this.fetch(`api/${uid}`);
		const lookup: { data: ApiData } = await res.json();
		const data = lookup.data;

		let credit_message: string;
		let credit_author: string;
		if (data.credits && data.credits.text) {
			credit_message = data.credits.text.substring(0, data.credits.text.indexOf('{'))
			credit_author = data.credits.text.substring(data.credits.text.indexOf('{') + 1, data.credits.text.indexOf('}'))
		}

		return { data, credit_message, credit_author, uid };
	}
</script>

<script lang="ts">
	import { stores } from '@sapper/app';
	import Parser from 'ua-parser-js';

	const { preloading, page, session } = stores();
	const parser = new Parser();
	parser.setUA($session['user-agent']);

	let mobile = parser.getResult().device['type'] == 'mobile';

	interface ApiData {
		name: string;
		date: string;
		assets: Assets;
		credits?: Credits;
		related: Related[];
	}

	interface Credits {
		text: string;
		link: string;
		image: string;
	}

	interface Assets {
		banner: string;
		mobile?: string;
		desktop?: string;
		screenshots: Screenshot[];
	}

	interface Screenshot {
		id: string;
	}

	interface Related {
		id: string;
		asset: string;
	}

	export let uid: string;
	export let data: ApiData;
	export let credit_message: string;
	export let credit_author: string;
</script>

<div class="wallprev-container">
	<div class="top-image">
		<div class="top-image-background">
			<img src={data.assets.banner} alt={`${data.name} Header`} />
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
	{#if credit_message}
		<div class="credits-section">
			<p>{credit_message}</p>
			<div class="user">
				<img
					src={data.credits.image}
					alt={credit_author} />
				<a href={data.credits.link}>
					{credit_author}
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
			{#if data.assets.screenshots.length === 4}
			<img src={data.assets.screenshots[3].id} alt={`${data.name} Image`} />
			<div class="spacer" />
			{:else}
				{#each data.assets.screenshots as screenshot }
					<img src={screenshot.id} alt={`${data.name} Image`} />
					<div class="spacer" />
				{/each}
			{/if}
		</div>
	</div>
	<div class="seperator" />
	<div class="sizes-section">
		<div class="subtitle">
			<h1>Sizes</h1>
		</div>
		<div class="download-grid">
			{#if data.assets.mobile}
				<div class="download-container-phone">
					<div class="phone">
						<div class="phone-shape" />
						<div class="phone-home-button" />
					</div>
					<div class="resolution">1125 × 2436</div>
					<div class="download-button">
						{#if mobile}
							<a
								href={data.assets.mobile}
								style="color: rgba(255, 255, 255, 1);">
								<p>Download</p>
							</a>
						{:else}
							<a
								href={`${data.assets.mobile}?download`}
								style="color: rgba(255, 255, 255, 1);"
								download={`${data.name}.png`}>
								<p>Download</p>
							</a>
						{/if}
					</div>
				</div>
			{/if}
			{#if data.assets.desktop}
				<div class="download-container-computer">
					<div class="computer">
						<div class="computer-shape" />
						<div class="computer-stand" />
					</div>
					<div class="resolution">2560 × 1440</div>
					<div class="download-button">
						{#if mobile}
							<a
								href={data.assets.desktop}
								style="color: rgba(255, 255, 255, 1);">
								<p>Download</p>
							</a>
						{:else}
							<a
								href={`${data.assets.desktop}?download`}
								style="color: rgba(255, 255, 255, 1);"
								download={`${data.name}.png`}>
								<p>Download</p>
							</a>
						{/if}
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
					<a href={`/wallpapers/${wallpaper.id}`}>
						<img
							src={wallpaper.asset}
							alt={`${wallpaper.id} Image`} />
					</a>
				{/each}
				<div class="spacer" />
			</div>
		</div>
		<div class="seperator" />
	{/if}
	<div class="copyright-notice" id="wppagenotice">
		<p>All madebymirac content is for personal use only and may not be redistributed or used for any sort of commercial purpose.</p>
	</div>
	<div class="footer" id="wppagefooter">
		<p>©{new Date().getFullYear()}, Mirac</p>
		<a href="/credits">
			<p>Credits</p>
		</a>
	</div>
</div>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.name} | madebymirac.com</title>
	<link rel="canonical" href="https://madebymirac.com/wallpapers/{uid}" />
	<meta name="title" content="{data.name} | madebymirac.com" />
	<meta
		name="description"
		content="Home of original wallpapers designed with love, made by Mirac" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://madebymirac.com/{uid}" />
	<meta property="og:title" content="{data.name} | madebymirac.com" />
	<meta
		property="og:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta property="og:image" content={data.assets.banner} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://madebymirac.com/{uid}" />
	<meta property="twitter:title" content="{data.name} | madebymirac.com" />
	<meta name="twitter:creator" content="@thatmirac" />
	<meta name="twitter:creator:id" content="1153786059718889472" />
	<meta
		property="twitter:description"
		content="Home of original wallpapers designed with love, made by Mirac" />
	<meta property="twitter:image" content={data.assets.banner} />
	<meta name="twitter:image:alt" content="Mirac Logo Card" />
</svelte:head>
