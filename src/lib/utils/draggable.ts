import type { ActionReturnType } from "./svelte"
import { supportsPointerEvents, supportsPassiveEvents } from "./supports"

export interface DraggableTryStartEvent<CustomDataType = any>
{
	/** An optional custom data type to be passed to other events. */
	data?: CustomDataType
	/** If set to true, the drag event will be cancelled and not started. */
	cancel: boolean
	/** The PointerEvent that triggered this drag start event. */
	readonly pointerEvent: PointerEvent
}

export interface DraggableEvent<CustomDataType = any>
{
	/** The number of pixels on the X axis that the item has been moved. */
	readonly dx: number
	/** The number of pixels on the Y axis that the item has been moved. */
	readonly dy: number
	/** If true, the drag operation was cancelled before it completed. */
	readonly isCancelled: boolean
	/** The optional data object that was passed in when starting the drag operation. */
	readonly data?: CustomDataType
}

type DragCallback<CustomDataType> = (ev: DraggableEvent<CustomDataType>) => void

export interface DraggableActionParameter<CustomDataType = any>
{
	/**
		An optional callback that will be called each time that the user tries to start a new drag operation.
		You can inspect the PointerEvent that triggered this operation, cancel the operation before it starts,
		and set a data payload to be handed to future events.
	*/
	readonly onTryStart?: (ev: DraggableTryStartEvent<CustomDataType>) => void

	/**
	 	A callback that will be called each time the drag operation progresses, so you can update the UI accordingly.
	*/
	readonly onUpdate: DragCallback<CustomDataType>

	/**
	 	A callback that will be called when the drag operation finishes, immediately after the last onUpdate.
	 	Note that if the operation was cancelled, onFinish will still be called.  You may want to reverse any
	 	changes made in onUpdate at that time.
	*/
	readonly onFinish: DragCallback<CustomDataType>

	/** Optional user-defined data of any type that will be available during the onUpdate and onFinish events. */
	readonly data?: CustomDataType
}

// ------------------------------------------------------------

/** If false, this action won't do anything because the browser doesn't support pointer events. */
export const isDraggableSupported = supportsPointerEvents

/**
	Attaches event handlers to an element to track how it is dragged.
	@param options Events and data to control the drag event.
	@example
	{#if isDraggableSupported}
		<div use:draggable={{ onTryStart, onUpdate, onFinish, data: "unique-id"}}></div>
	{/if}
*/
export function draggable<CustomDataType>(
	element: HTMLElement,
	options: DraggableActionParameter<CustomDataType>):
	ActionReturnType<DraggableActionParameter<CustomDataType>>
{
	let isDragging: boolean = false
	let originX: number = 0
	let originY: number = 0

	if (!isDraggableSupported) return

	element.style.touchAction = "none"
	const eventOptions = supportsPassiveEvents ? { passive: true } : undefined
	element.addEventListener("pointerdown", onPointerDown)
	element.addEventListener("pointerup", onPointerUp)
	element.addEventListener("pointermove", onPointerMove, eventOptions)
	element.addEventListener("lostpointercapture", onLostPointerCapture, eventOptions)

	return {
		destroy(): void
		{
			isDragging = false
			element.removeEventListener("pointerdown", onPointerDown)
			element.removeEventListener("pointerup", onPointerUp)
			element.removeEventListener("pointermove", onPointerMove)
			element.removeEventListener("lostpointercapture", onLostPointerCapture)
		}
	}

	function startDrag(ev: PointerEvent): void
	{
		isDragging = true
		element.setPointerCapture(ev.pointerId)
		originX = ev.clientX
		originY = ev.clientY
	}

	function onPointerDown(ev: PointerEvent): void
	{
		if (isDragging) return

		// We only want to handle the left mouse button or equivalent.
		if (!ev.isPrimary || ev.button !== 0) return

		// If an onTryStart callback was provided, call it.
		if (options.onTryStart)
		{
			const dragEvent: DraggableTryStartEvent<CustomDataType> =
			{
				cancel: false,
				pointerEvent: ev,
				data: options.data,
			}
			options.onTryStart(dragEvent)
			if (dragEvent.cancel) return
			// Allow the onTryStart callback to mutate the original data object passed in.
			if (dragEvent.data !== undefined) (options.data as any) = dragEvent.data
		}

		startDrag(ev)
		ev.preventDefault()
	}

	function onPointerUp(ev: PointerEvent): void
	{
		if (!isDragging) return

		// We only want to handle the left mouse button or equivalent.
		if (!ev.isPrimary || ev.button !== 0) return

		const args = buildDraggableEventArgs(ev)
		options.onUpdate(args)
		options.onFinish(args)
		element.releasePointerCapture(ev.pointerId)

		isDragging = false
		ev.preventDefault()
	}

	function onPointerMove(ev: PointerEvent): void
	{
		if (!isDragging) return

		options.onUpdate(buildDraggableEventArgs(ev))
	}

	function onLostPointerCapture(ev: PointerEvent): void
	{
		if (!isDragging) return

		const args = buildDraggableEventArgs(ev, /* isCancelled: */ true)
		options.onUpdate(args)
		options.onFinish(args)
		element.releasePointerCapture(ev.pointerId)

		isDragging = false
		ev.preventDefault()
	}

	function buildDraggableEventArgs(ev: PointerEvent, isCancelled = false): DraggableEvent<CustomDataType>
	{
		return {
			dx: ev.clientX - originX,
			dy: ev.clientY - originY,
			data: options.data,
			isCancelled: isCancelled,
		}
	}
}
