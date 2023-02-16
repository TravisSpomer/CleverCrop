<script lang="ts">
	import ResizableCroppedImageDemo from "$lib/components/ResizableCroppedImageDemo.svelte"
</script>

<svelte:head>
	<title>Clever cropping</title>
</svelte:head>

<h1>Clever cropping</h1>

<ResizableCroppedImageDemo
	src="/images/photos/cherry-blossoms.jpg"
	width={600} height={400}
	focusRegion={{ left: 0.5, top: 0.5, width: 0.5, height: 0.5 }}
/>
<!-- For now, just focus on the lower-right quarter. -->
