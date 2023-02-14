<script lang="ts">
	import "../app.scss"
	import NavBar from "$lib/components/NavBar.svelte"
	import Year from "$lib/components/Year.svelte"
</script>

<NavBar />

<main id="top">
<div class="content">
<slot></slot>
</div>
</main>

<footer>
<p>
	&copy; <Year from={2023} /> Travis Spomer.
</p>
</footer>
