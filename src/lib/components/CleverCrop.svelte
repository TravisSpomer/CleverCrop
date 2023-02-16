<script context="module" lang="ts">
	export interface Region
	{
		left: number
		top: number
		width: number
		height: number
	}
</script>

<script lang="ts">
	export let src: string
	export let alt: string
	export let width: number
	export let height: number
	export let focusRegion: Region | undefined = undefined
</script>

<style lang="scss">

.crop
{
	position: relative;
	width: 100%;
	height: 100%;

	img
	{
		position: absolute;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: auto;

		object-fit: cover;

		border: 1px solid red;
	}
}

</style>

<div class="crop">
	<img {src} {alt} {width} {height} />
</div>
