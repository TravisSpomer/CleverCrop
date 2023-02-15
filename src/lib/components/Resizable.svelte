<script lang="ts">
	import { draggable, isDraggableSupported, type DraggableEvent } from "../utils/draggable"

	export let mode: "corners" | "crop" | "grip" = "corners" // Only "corners" is implemented
	export let width = 300
	export let height = 200

	let dx: number | null = null
	let dy: number | null = null
	$: visibleWidth = dx !== null ? width + dx : width
	$: visibleHeight = dy !== null ? height + dy : height

	function onHandleDragUpdate(ev: DraggableEvent)
	{
		switch(ev.data)
		{
			case "bottom-right":
				dx = ev.dx
				dy = ev.dy
				break
			default:
				throw new Error(`Unknown drag handle ${ev.data}`)
		}
	}

	function onHandleDragFinish(ev: DraggableEvent)
	{
		if (ev.isCancelled)
		{
			dx = null
			dy = null
			return
		}

		switch(ev.data)
		{
			case "bottom-right":
				width += ev.dx
				height += ev.dy
				dx = null
				dy = null
				break
			default:
				throw new Error(`Unknown drag handle ${ev.data}`)
		}
	}
</script>

<style lang="scss">

.resizable
{
	position: relative;
}

.handle
{
	position: absolute;
	width: 10px;
	height: 10px;

	border: 1px solid var(--foreground);
	border-radius: 3px;
	background-color: var(--background);

	touch-action: none;
}

</style>

<div class="resizable" style:width="{visibleWidth}px" style:height="{visibleHeight}px">
	<slot />
	{#if isDraggableSupported}
		{#if mode === "corners"}
			<div class="handle" style:right="-5px" style:bottom="-5px" style:cursor="nwse-resize" use:draggable={{ onUpdate: onHandleDragUpdate, onFinish: onHandleDragFinish, data: "bottom-right" }}></div>
		{/if}
	{/if}
</div>
