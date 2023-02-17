import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"

/** @type {import("./$types").RequestHandler} */
export async function GET({ fetch, request })
{
	return json({ message: `Ready to connect to Azure Cognitive Services "${env.AZURE_COGNITIVE_SERVICES_NAME}"` })
}
