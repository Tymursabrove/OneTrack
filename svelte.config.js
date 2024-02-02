import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true,
			typescript: true,
		}),
	]
};

export default config;
