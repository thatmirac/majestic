import fetch from 'node-fetch';

export async function get(req, res, next) {
	const result = await fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE}/purge_cache`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.CLOUDFLARE_BEARER}`,
			'Content-Type': 'application/json; charset=utf-8',
			'User-Agent': 'Majestic/1.0 (+https://tale.me/go/ua#majestic)',
			'Cache-Control': 'no-cache'
		},
		body: JSON.stringify({
			purge_everything: true
		})
	})

	if (result.ok) {
		const data = await result.json()
		if (data.success === true) {
			res
				.writeHead(200, {
					'Content-Type': 'application/json'
				})
				.end(JSON.stringify({
					success: true
				}))
			return
		}
	}

	res
		.writeHead(200, {
			'Content-Type': 'application/json'
		})
		.end(JSON.stringify({
			success: false
		}))
	return
}
