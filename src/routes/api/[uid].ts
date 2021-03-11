import fetch from 'node-fetch';

export interface Wallpaper {
	id: string;
	status: string;
	date: string;
	name: string;
	text?: string;
	link?: string;
	picture?: { id: string };
	banner: { id: string };
	desktop_asset?: { id: string };
	mobile_asset?: { id: string };
	screenshots: (ScreenshotsEntity)[];
	related: (RelatedEntity)[];
}

export interface ScreenshotsEntity {
	directus_files_id: string;
}

export interface RelatedEntity {
	wallpapers_related_id: {
		id: string;
		preview: string;
	}
}

export async function get(req, res, next) {
	const uid = req.params.uid
	fetch(`https://cms.atale.me/items/wallpapers/${uid}?fields=*,*.directus_files_id,*.wallpapers_id,*.id,related.wallpapers_related_id.id,related.wallpapers_related_id.preview`, {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://atale.me/go/ua)'
		}
	})
		.then(res => res.json())
		.then(async (data: { data: Wallpaper }) => {
			const lookup = data.data;
			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify({
					status: 200,
					date: new Date().toString(),
					data: {
						name: lookup.name,
						date: formatted_date(new Date(lookup.date)),
						related: lookup.related.map(related => {
							return {
								id: related.wallpapers_related_id.id,
								asset: `https://cms.atale.me/assets/${related.wallpapers_related_id.preview}?quality=80` 
							}
						}),
						assets: {
							banner: `https://cms.atale.me/assets/${lookup.banner.id}?quality=80`,
							mobile: lookup.mobile_asset ? `https://cms.atale.me/assets/${lookup.mobile_asset.id}` : null,
							desktop: lookup.desktop_asset ? `https://cms.atale.me/assets/${lookup.desktop_asset.id}` : null,
							screenshots: lookup.screenshots.map(screenshot => {
								return { id: `https://cms.atale.me/assets/${screenshot.directus_files_id}?quality=80` }
							})
						},
						credits: {
							text: lookup.text || null,
							link: lookup.link || null,
							image: lookup.picture ? `https://cms.atale.me/assets/${lookup.picture.id}?quality=80` : null
						}
					}
				}))
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

// function related_values(related: (RelatedEntity)[]) {
// 	const related_previews = [];
// 	const promises = related.map(object => {
// 		return new Promise(resolve, reject) {

// 		}
// 	})
// 	for (const object of related) {
// 		fetch(`https://cms.atale.me/items/wallpapers/${object.wallpapers_related_id}?fields=preview`, {
// 			headers: {
// 			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
// 			'User-Agent': 'Majestic/1.0 (+https://atale.me/go/ua)'
// 			}
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			related_previews.push({
// 				id: object.wallpapers_related_id,
// 				preview: data.data.preview
// 			})
// 		})
// 	}
	

// 	return related_previews;
// }

// async function get_preview(object: RelatedEntity): Promise<{ id: string; preview: string; }> {
// 	const result = await 

// 	const data = await result.json();

// 	return {
// 		id: object.wallpapers_related_id,
// 		preview: data.data.preview
// 	}
// }