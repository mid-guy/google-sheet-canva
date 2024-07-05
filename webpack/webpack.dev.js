const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	plugins: [
		new DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
		new HtmlWebpackPlugin({
			title: 'App 1',
			template: path.resolve(__dirname, '..', './src/index.html'),
			sharedRemoteEntry: `http://localhost:3003/remoteEntry.js`, // change this according you're needs
			app2RemoteEntry: `http://localhost:3002/remoteEntry.js`, // change this according you're needs
		}),
	],
	devtool: 'eval-source-map',
};
