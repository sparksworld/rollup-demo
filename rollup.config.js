const path = require("path");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");

const pluginName = "xxx_plugin";
const outputDir = "./dist";

function fileFormat(type) {
	return path.join(__dirname, outputDir, `xxx_plugin.${type}.js`);
}

export default {
	input: path.resolve(__dirname, "./src/main.js"),
	output: [
		{
			name: pluginName,
			format: "es",
			file: fileFormat("es")
		},
		{
			name: pluginName,
			format: "umd",
			file: fileFormat("umd")
		},
		{
			name: pluginName,
			format: "iife",
			file: fileFormat("iife")
		},
		{
			name: pluginName,
			format: "amd",
			file: fileFormat("amd")
		},
		{
			name: pluginName,
			format: "cjs",
			file: fileFormat("cjs"),
			exports: "auto"
		}
	],
	plugins: [
		commonjs(),
		/* @babel/preset-env和@babel/plugin-transform-runtime有两种配置方式 */
		babel({
			exclude: /\/node_modules\//,
			presets: [
				[
					"@babel/preset-env",
					{
						targets: "> 0.25%, not dead" /* 配置兼容的程度 */
					}
				]
			],
			plugins: [
				[
					"@babel/plugin-transform-runtime",
					{
						corejs: 3,
						regenerator: true
					}
				]
			],
			babelHelpers: "runtime"
		}),
		nodeResolve()
	]
};
