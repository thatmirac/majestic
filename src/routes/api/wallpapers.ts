import fetch from 'node-fetch';

export async function get(req, res, next) {
	fetch('https://cms.tale.me/items/mirac_wallpapers?fields=slug,name,mobile_preview,status&sort=-date', {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://tale.me/go/ua#majestic)',
			'Cache-Control': 'no-cache'
		}
	})
		.then(res => res.json())
		.then((data: { data: [{ slug: string, name: string, mobile_preview: string, status: string }]}) => {
			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify({
					status: 200,
					date: new Date().toString(),
					data: data.data.filter(value => value.status === 'published')
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
					data: []
				}));
		})
}
