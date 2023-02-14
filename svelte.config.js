import sveltePreprocess from "svelte-preprocess"
import adapterStatic from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
export default {

	preprocess: [
		sveltePreprocess(),
	],

	kit: {
		adapter: adapterStatic(),
		paths: {
			base: process.env.BASE_URL || "",
		},
	},

}
