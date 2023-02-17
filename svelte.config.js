import sveltePreprocess from "svelte-preprocess"
import adapterAzure from "svelte-adapter-azure-swa"

/** @type {import('@sveltejs/kit').Config} */
export default {

	preprocess: [
		sveltePreprocess(),
	],

	kit: {
		adapter: adapterAzure(),
		paths: {
			base: process.env.BASE_URL || "",
		},
	},

}
