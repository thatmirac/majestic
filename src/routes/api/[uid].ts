import fetch from 'node-fetch';

export interface Wallpaper {
	id: string;
	status: string;
	date: string;
	name: string;
	credits_text?: string;
	credits_link?: string;
	desktop_preview?: string;
	desktop_asset?: string;
	mobile_asset: string;
	mobile_preview: string;
	related: (RelatedEntity)[];
}

export interface ScreenshotsEntity {
	directus_files_id: string;
}

export interface RelatedEntity {
	related_mirac_wallpapers_slug: {
		slug: string;
		mobile_preview: string;
	}
}

export async function get(req, res, next) {
	const uid = req.params.uid
	fetch(`https://cms.tale.me/items/mirac_wallpapers/${uid}?fields=*,related.related_mirac_wallpapers_slug.*`, {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://tale.me/go/ua#majestic)',
			'Cache-Control': 'no-cache'
		}
	})
		.then(res => res.json())
		.then(async (data: { data: Wallpaper }) => {
			const lookup = data.data;

			const data2 = JSON.stringify({
				status: 200,
				date: new Date().toString(),
				data: {
					name: lookup.name,
					date: formatted_date(new Date(lookup.date)),
					related: lookup.related.map(related => {
						return {
							id: related.related_mirac_wallpapers_slug.slug,
							asset: `https://cms.tale.me/assets/${related.related_mirac_wallpapers_slug.mobile_preview}`
						}
					}),
					assets: {
						banner: `https://cms.tale.me/assets/${lookup.desktop_preview ?? lookup.mobile_preview}`,
						mobile: `https://cms.tale.me/assets/${lookup.mobile_asset}`,
						desktop: lookup.desktop_asset ? `https://cms.tale.me/assets/${lookup.desktop_asset}` : null,
						screenshots: [`https://cms.tale.me/assets/${lookup.mobile_preview}`]
					},
					credits: {
						text: lookup.credits_text || null,
						link: lookup.credits_link || null
					}
				}
			})

			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(data2)
		})
		.catch(() => {
			res
				.writeHead(400, {
					'Content-Type': 'application/json',
				})
				.end(JSON.stringify({
					status: 400,
					date: new Date().toString(),
					data: null
				}));
		})
}

function formatted_date(date: Date): string {
	const month = date.getMonth().toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return `${day}.${month}.${date.getFullYear()}`
}
