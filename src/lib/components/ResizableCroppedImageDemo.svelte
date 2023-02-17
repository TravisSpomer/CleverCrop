<script lang="ts">
	import { toPercent } from "$lib/utils/css"
	import CleverCrop, { type Region } from "$lib/components/CleverCrop.svelte"
	import Resizable from "$lib/components/Resizable.svelte"

	const showOverlay = false

	export let src: string
	export let width: number
	export let height: number
	export let focusRegion: Region
</script>

<style lang="scss">

.clipping
{
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.focus-overlay
{
	position: absolute;

	border: 5px dotted white;

	pointer-events: none;
}

</style>

<Resizable {width} {height}>
	<div class="clipping">
		<CleverCrop {src} {width} {height} {focusRegion} alt="Cropping demo" />
		{#if showOverlay}
			<div
				class="focus-overlay" inert
				style:left={toPercent(focusRegion.left)}
				style:top={toPercent(focusRegion.top)}
				style:width={toPercent(focusRegion.width)}
				style:height={toPercent(focusRegion.height)}
			/>
		{/if}
	</div>
</Resizable>
