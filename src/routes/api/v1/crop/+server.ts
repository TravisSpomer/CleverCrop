import { json, error } from "@sveltejs/kit"

/** @type {import("./$types").RequestHandler} */
export async function POST({ fetch, request })
{
	const { src } = await request.json()
	if (!src) throw error(400, "src is required")

	// Call the Cognitive Services API and just pass along the URL.
	const response = await fetch("https://travisvision.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2022-10-12-preview&features=description,smartCrops&language=en&smartcrops-aspect-ratios=1", {
		method: "POST",
		body: JSON.stringify({ url: src }),
		headers: { "content-type": "application/json", "Ocp-Apim-Subscription-Key": "" }
	})

	const data = await response.json()
	const title = data?.descriptionResult?.values[0]?.text || "Custom URL"
	const size = data?.metadata
	const region = data?.smartCropsResult?.values[0]?.boundingBox
	const focusRegion = (size && region) ? { left: region.x / size.width, top: region.y / size.height, width: region.w / size.width, height: region.h / size.height } : { left: 0, top: 0, width: 1, height: 1 }

	return json({ title, src, width: 600, height: 600, focusRegion })
}
