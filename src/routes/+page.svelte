<script lang="ts">
	import { images, defaultIndex } from "$lib/data/images"
	import ResizableCroppedImageDemo from "$lib/components/ResizableCroppedImageDemo.svelte"

	let sourceIndex: number = defaultIndex
	$: selectedSource = images[sourceIndex]
</script>

<svelte:head>
	<title>Clever cropping</title>
</svelte:head>

<h1>Clever cropping</h1>

<select bind:value={sourceIndex}>
	{#each images as source, i}
		<option value={i}>{source.title}</option>
	{/each}
</select>

<ResizableCroppedImageDemo
	src={selectedSource.src}
	width={selectedSource.width} height={selectedSource.height}
	focusRegion={selectedSource.focusRegion}
/>
