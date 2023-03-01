module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						components: './app/components',
						constants: './app/constants/',
						ui: './app/components/ui',
						screens: './app/components/screens',
						interface: './app/interfaces',
						hooks: './app/hooks',
						services: './app/services',
						utils: './app/utils',
						assets: './app/assets',
						configs: './app/configs',
						store: './app/store',
						app: './app',
					},
				},
			],
		],
	}
}
