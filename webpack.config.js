const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// agora vou adcionar ReactRefreshWebpackPlugin na seção de plugins,
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
	mode: isDevelopment ? "development" : "production",
	devtool: isDevelopment ? "eval-source-map" : "source-map",
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	devServer: {
		static: path.resolve(__dirname, "public"),
		hot: true, // isso ainda é a configuração do ReactRefreshWebpackPlugin
	},
	plugins: [
		isDevelopment && new ReactRefreshWebpackPlugin(), // significa que vou usar ReactRefreshWebpackPlugin só em desenvolvimento(configuração do ReactRefreshWebpackPlugin)
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	].filter(Boolean), // (configuração do ReactRefreshWebpackPlugin) aqui vamos filtrar(remover) tudo que for false em ReactRefreshWebpackPlugin ...isso é um raquezinho pra gente adcionar plugins dentro do webpack
	module: {
		rules: [
			{
				test: /\.(j|t)sx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [
							isDevelopment && require.resolve("react-refresh/babel"),
						].filter(Boolean),
					},
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};
