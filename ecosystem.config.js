module.exports = {
	apps: [
		{
			name: 'majestic',
			script: 'yarn node __sapper__/build',
			env: {
				NODE_ENV: 'development',
				PORT: 3000,
			},
		},
	],
};
