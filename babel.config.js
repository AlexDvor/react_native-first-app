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
						data: './app/data/',
						ui: './app/components/ui',
						screens: './app/components/screens',
						interface: './app/interfaces',
						hooks: './app/hooks',
						services: './app/services',
						utils: './app/utils',
						assets: './app/assets',
						icons: './app/assets/icons',
						configs: './app/configs',
						store: './app/store',
						app: './app',
					},
				},
			],
		],
	}
}
