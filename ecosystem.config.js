module.exports = {
	apps: [
		{
			name: 'majestic',
			script: '__sapper__/build',
			env: {
				NODE_ENV: 'development',
				PORT: 3000,
			},
		},
	],
};
