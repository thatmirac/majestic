import fetch from 'node-fetch';

export interface Wallpaper {
	id: string;
	status: string;
	date: string;
	name: string;
	credits_text?: string;
	credits_link?: string;
	picture?: { id: string };
	banner: { id: string };
	desktop_asset?: { id: string };
	mobile_asset: { id: string };
	screenshots: (ScreenshotsEntity)[];
	related: (RelatedEntity)[];
}

export interface ScreenshotsEntity {
	directus_files_id: string;
}

export interface RelatedEntity {
	related_wallpapers_slug: {
		slug: string;
		mobile_asset: string;
	}
}

export async function get(req, res, next) {
	const uid = req.params.uid
	fetch(`https://cms.tale.me/items/wallpapers/${uid}?fields=name,status,date,related.related_wallpapers_slug.slug,related.related_wallpapers_slug.mobile_asset,mobile_asset.id,desktop_asset.id,credits_text,credits_link`, {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://tale.me/go/ua#majestic)',
			'Cache-Control': 'no-cache'
		}
	})
		.then(res => res.json())
		.then(async (data: { data: Wallpaper }) => {
			const lookup = data.data;

			if (lookup.status !== 'published') {
				return res.writeHead(404).end()
			}

			const json = JSON.stringify({
				status: 200,
				date: new Date().toString(),
				data: {
					name: lookup.name,
					date: lookup.date,
					related: lookup.related.map(related => {
						return {
							id: related.related_wallpapers_slug.slug,
							asset: `https://cms.tale.me/assets/${related.related_wallpapers_slug.mobile_asset}?quality=80`
						}
					}),
					assets: {
						banner: `https://cms.tale.me/assets/${lookup.mobile_asset.id}?quality=80`,
						mobile: `https://cms.tale.me/assets/${lookup.mobile_asset.id}`,
						desktop: lookup.desktop_asset ? `https://cms.tale.me/assets/${lookup.desktop_asset.id}` : null,
						screenshots: [`https://cms.tale.me/assets/${lookup.mobile_asset.id}`]
					},
					credits: {
						text: lookup.credits_text || null,
						link: lookup.credits_link || null
					}
				}
			})

			return res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(json)
		})
		.catch((err) => {
			console.log(err)
			return res
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
