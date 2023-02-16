<script lang="ts">
	import CleverCrop, { type Region } from "$lib/components/CleverCrop.svelte"
	import Resizable from "$lib/components/Resizable.svelte"

	export let src: string
	export let width: number
	export let height: number
	export let focusRegion: Region

	function toPercent(fraction: number): string
	{
		return `${fraction * 100}%`
	}
</script>

<style lang="scss">

.overlay
{
	position: absolute;

	border: 1px solid #00000020;
	background-color: #ffffff20;
}

.clipping
{
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

</style>

<Resizable {width} {height}>
	<div class="clipping">
		<CleverCrop {src} {width} {height} {focusRegion} alt="Cropping demo" />
		<!-- {#if focusRegion}
			<div class="overlay"
				style:left={toPercent(focusRegion.left)}
				style:top={toPercent(focusRegion.top)}
				style:width={toPercent(focusRegion.width)}
				style:height={toPercent(focusRegion.height)}
			/>
		{/if} -->
	</div>
</Resizable>
