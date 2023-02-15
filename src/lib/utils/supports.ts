/** True if the browser supports passive events: that is, addEventListener(_, _, { passive:true }). */
export const supportsPassiveEvents = getSupportsPassiveEvents()

/** True if the browser supports pointer events: that is, pointerdown, pointerup, etc. */
export const supportsPointerEvents = !!("window" in globalThis && window.PointerEvent)


function getSupportsPassiveEvents(): boolean
{
	// Test passive events support by registering for a fake event listener, and seeing if the browser
	// accesses the "passive" property of addEventListener.  Older browsers will just see the options object
	// as a true-ish value and continue.

	let supports = false
	try
	{
		const options = Object.defineProperty({}, "passive",
			{
				get: () =>
				{
					supports = true
					return undefined
				},
			})

		window.addEventListener("__testevent", null as unknown as EventListener, options)
	}
	catch (ex)
	{
		// Expected
	}

	return supports
}
