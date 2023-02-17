<script lang="ts">
	import { onMount } from "svelte"
	import { images, defaultIndex, type SourceInfo } from "$lib/data/images"
	import ResizableCroppedImageDemo from "$lib/components/ResizableCroppedImageDemo.svelte"

	let sources = [...images]
	let selectedSource: SourceInfo | null
	let sourceIndex: number = defaultIndex
	let customUrl: string
	let isLoadingCustom: boolean = false

	$: if (sourceIndex >= 0)
	{
		selectedSource = sources[sourceIndex]
	}
	else
	{
		selectedSource = null
	}

	async function loadCustomUrl()
	{
		try
		{
			isLoadingCustom = true
			selectedSource = null

			sources.push(await (await fetch("/v1/crop", {
				method: "POST",
				body: JSON.stringify({ src: customUrl }),
				headers: { "content-type": "application/json" }
			})).json())
			sources = sources
			sourceIndex = sources.length - 1
			customUrl = ""
		}
		finally
		{
			isLoadingCustom = false
		}
	}

	onMount(() =>
	{
		// Wake up the server when loading the page
		fetch("/v1/hello")
	})
</script>

<svelte:head>
	<title>Clever cropping</title>
</svelte:head>

<h1>Clever cropping</h1>

<select bind:value={sourceIndex}>
	<option value={-1}>{sourceIndex === -1 && selectedSource ? selectedSource.title : "Custom URL"}</option>
	{#each sources as source, i}
		<option value={i}>{source.title}</option>
	{/each}
</select>

{#if isLoadingCustom}
	<div>Azure Cognitive Services is analyzing that image...</div>
	<div><progress /></div>
{:else if selectedSource}
	<ResizableCroppedImageDemo
		src={selectedSource.src}
		width={selectedSource.width} height={selectedSource.height}
		focusRegion={selectedSource.focusRegion}
	/>
{:else}
	<div>
		<input type="url" bind:value={customUrl} placeholder="Image URL" />
		<button on:click={loadCustomUrl} disabled={!customUrl || customUrl.length === 0}>Load</button>
		<br />
		<small><a href="https://cdn.myportfolio.com/251fb2e6182d88d1a1618f12b00b952c/af48e230-9dd8-48e6-b80b-2041ee8660b6_rw_1920.jpg?h=7dd804b2bb0ace85d45d9d232929a138" target="_blank" rel="noreferrer" on:click|preventDefault>example</a></small>
	</div>
{/if}

