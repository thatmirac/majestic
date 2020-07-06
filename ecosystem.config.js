module.exports = {
	apps: [
		{
			name: 'mellow',
			script: '__sapper__/build',
			env: {
				NODE_ENV: 'production',
				PORT: 4000,
			},
		},
	],
};
