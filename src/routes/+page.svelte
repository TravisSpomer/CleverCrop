<script>
	import CleverCrop from "$lib/components/CleverCrop.svelte"
	import Resizable from "$lib/components/Resizable.svelte"
</script>

<svelte:head>
	<title>Clever cropping</title>
</svelte:head>

<h1>Clever cropping</h1>

<Resizable>
	<CleverCrop src="/images/photos/cherry-blossoms.jpg" />
</Resizable>
