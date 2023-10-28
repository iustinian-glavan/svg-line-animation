import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.ts',
		output: {
			name: 'animate',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			typescript() // so Rollup can convert TypeScript to JavaScript
		]
	},
	{
		input: 'src/main.ts',
		plugins: [
			typescript() // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{ file: pkg.module, format: 'es' }
		]
	}
];