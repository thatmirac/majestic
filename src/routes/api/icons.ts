import fetch from 'node-fetch';

export async function get(req, res, next) {
	fetch('https://cms.tale.me/items/icons?fields=name,preview,asset&sort=name', {
		headers: {
			'Authorization': `Bearer ${process.env.DIRECTUS_BEARER}`,
			'User-Agent': 'Majestic/1.0 (+https://tale.me/go/ua#majestic)',
			'Cache-Control': 'no-cache'
		}
	})
		.then(res => res.json())
		.then((data: { data: [{ name: string, preview: string, asset: string }]}) => {
			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify({
					status: 200,
					date: new Date().toString(),
					data: data.data
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
