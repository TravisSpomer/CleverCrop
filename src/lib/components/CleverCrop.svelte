<script context="module" lang="ts">
	import { toPercent } from "$lib/utils/css"

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

	let focusPoint: string

	$: if (focusRegion)
	{
		// Condense the focus region to a single point.

		// focusRegion = { left: 0.5, top: 0.5, width: 0.5, height: 0.5 }
		// As an example, take a focus region of the lower-right quadrant of an image: we want to ensure that the full lower-right
		// quadrant of the image is visible for as long as is possible. Essentially, when there's not enough space to fit the entire image,
		// we want to sacrifice the pixels farthest away from the region—on the left and top—first.

		// Even with container query units and fancy calc() math, object-fit: cover and object-position aren't sufficient.
		// It seems like you need to do all the layout math to make this work in real pixels yourself, either in JS or some VERY complicated
		// CSS calc() rules. That's a problem for the future I guess.

		// FUTURE: Instead of using object-position percentages, use the actual bounds of the region to manually calculate the translation
		// and scale values you need for the image. (bind:clientWidth, etc.)

		// BAD PLACEHOLDER ALGORITHM:

		// The naive algorithm is just to find the center point of the region and use that for object-position.
		// In this example that's object-position: 75% 75%. But that doesn't produce the desired effect: reducing the available space
		// immediately causes pixels on the right edge to be sacrificed even when there are "unnecessary" pixels that could have been sacrificed.
		const focusX = (focusRegion.left + focusRegion.width / 2)
		const focusY = (focusRegion.top + focusRegion.height / 2)
		focusPoint = `${toPercent(focusX)} ${toPercent(focusY)}`
	}
	else
	{
		focusPoint = "50% 50%"
	}
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
	<img {src} {alt} {width} {height} style:object-position={focusPoint} />
</div>
