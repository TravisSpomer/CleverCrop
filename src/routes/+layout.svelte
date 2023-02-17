<script lang="ts">
	import "../app.scss"
	import Year from "$lib/components/Year.svelte"
</script>

<main id="top">
<div class="content">
<slot></slot>
</div>
</main>

<footer>
<p>
	&copy; <Year from={2023} /> Travis Spomer. <a href="https://github.com/TravisSpomer/CleverCrop" target="_blank" rel="noreferrer">GitHub</a>
</p>
</footer>
