'use strict';
const fetch = (url, args = {}) => {
	args.headers = args.headers || {};
	args.headers['user-agent'] = 'Made By Mirac (Server)';
	return require('node-fetch')(url, args);
};

export async function get(request, response, next) {
	fetch('https://wallpapers.prismic.io/api/v2', {
		method: 'GET',
		redirect: 'follow',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then(response => response.json())
		.then(result => {
			response
				.writeHead(200, {
					'Content-Type': 'application/json',
				})
				.end(
					JSON.stringify({
						status: 200,
						reference: result.refs[0].ref,
						date: new Date().toLocaleDateString('en-US'),
					})
				);
		})
		.catch(error => {
			if (error) {
				response
					.writeHead(400, {
						'Content-Type': 'application/json',
					})
					.end(
						JSON.stringify({
							status: 400,
							reference: 'UNKNOWN',
							date: new Date().toLocaleDateString('en-US'),
						})
					);
			}
		});
}
