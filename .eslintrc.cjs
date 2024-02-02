module.exports = {
	parser: '@typescript-eslint/parser',
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	overrides: [{
		files: ['*.svelte'],
		processor: 'svelte3/svelte3'
	},{
		files: ['*.ts'],
		parser: '@typescript-eslint/parser',
	}],
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	settings: {
		'svelte3/typescript': () => require('typescript')
	}
};
