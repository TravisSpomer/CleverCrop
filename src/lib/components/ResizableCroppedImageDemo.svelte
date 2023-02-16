<script lang="ts">
	import CleverCrop, { type Region } from "$lib/components/CleverCrop.svelte"
	import Resizable from "$lib/components/Resizable.svelte"

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

</style>

<Resizable {width} {height}>
	<div class="clipping">
		<CleverCrop {src} {width} {height} {focusRegion} alt="Cropping demo" />
	</div>
</Resizable>
