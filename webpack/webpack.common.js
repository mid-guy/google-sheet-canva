const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const HotModuleReplacementPlugin =
	require('webpack').HotModuleReplacementPlugin;

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.ts'),
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HotModuleReplacementPlugin(),
		new ModuleFederationPlugin({
			name: 'app1', // Name of micro-frontend
			library: { type: 'var', name: 'app1' },
			filename: 'remoteEntry.js', // Name of remote entry file
			exposes: {
				'./App': './src/App',
			},
			remotes: {
				shared: 'shared',
				app2: 'app2',
			},
			shared: {
				react: {
					eager: true,
					// import: 'react', // the "react" package will be used a provided and fallback module
					// shareKey: 'react', // under this name the shared module will be placed in the share scope
					// shareScope: 'legacy', // share scope with this name will be used
					// singleton: true, // only a single version of the shared module is allowed
				},
				'react-dom': {
					eager: true,
					// import: 'react-dom', // the "react" package will be used a provided and fallback module
					// shareKey: 'react-dom', // under this name the shared module will be placed in the share scope
					// shareScope: 'legacy', // share scope with this name will be used
					// singleton: true, // only a single version of the shared module is allowed
				},
				zustand: {
					eager: true,
					// singleton: true,
					// requiredVersion: deps.zustand,
				},
			},
		}),
	],
	output: {
		path: path.resolve(__dirname, '..', './dist'),
		filename: 'bundle.js',
	},
	devServer: {
		port: 3001,
		static: path.resolve(__dirname, '..', './dist'),
		hot: false,
		liveReload: true,
	},
};
