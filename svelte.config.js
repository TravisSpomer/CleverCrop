import sveltePreprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-auto"

/** @type {import("@sveltejs/kit").Config} */
export default {

	preprocess: [
		sveltePreprocess(),
	],

	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.BASE_URL || "",
		},
	},

}
