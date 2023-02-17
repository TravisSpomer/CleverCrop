import type { Region } from "$lib/components/CleverCrop.svelte"

export interface SourceInfo
{
	title: string,
	src: string
	width: number
	height: number
	focusRegion: Region
}

export const defaultIndex = 2

export const images: ReadonlyArray<SourceInfo> =
[
	{
		title: "Abstract green",
		src: "/images/abstract/green.png",
		width: 600, height: 100,
		focusRegion: { left: 0.16667, top: 0, width: 0.16667, height: 1 },
	},
	{
		title: "Alleah",
		src: "/images/photos/alleah.jpg",
		width: 400, height: 600,
		focusRegion: { left: 0.3, top: 0.3, width: 0.25, height: 0.1 },
	},
	{
		title: "Cherry blossoms",
		src: "/images/photos/cherry-blossoms.jpg",
		width: 600, height: 400,
		focusRegion: { left: 0, top: 0, width: 0.5, height: 1 },
	},
	{
		title: "DeMarquan",
		src: "/images/photos/demarquan.jpg",
		width: 400, height: 600,
		focusRegion: { left: 0.4, top: 0.15, width: 0.2, height: 0.15 },
	},
	{
		title: "Herbert",
		src: "/images/photos/herbert.jpg",
		width: 600, height: 400,
		focusRegion: { left: 0.4, top: 0.3, width: 0.2, height: 0.15 },
	},
	{
		title: "Javier",
		src: "/images/photos/javier.jpg",
		width: 440, height: 600,
		focusRegion: { left: 0.2, top: 0.1, width: 0.2, height: 0.15 },
	},
	{
		title: "Lava",
		src: "/images/photos/lava.jpg",
		width: 600, height: 450,
		focusRegion: { left: 0.1, top: 0, width: 0.6, height: 1 },
	},
	{
		title: "Maskali",
		src: "/images/photos/maskali.jpg",
		width: 400, height: 600,
		focusRegion: { left: 0.35, top: 0.3, width: 0.4, height: 0.3 },
	},
	{
		title: "Morning Glory",
		src: "/images/photos/morning-glory.jpg",
		width: 600, height: 400,
		focusRegion: { left: 0.2, top: 0.2, width: 0.8, height: 0.8 },
	},
	{
		title: "Sea Nettles",
		src: "/images/photos/sea-nettle.jpg",
		width: 600, height: 450,
		focusRegion: { left: 0.2, top: 0.35, width: 0.4, height: 0.2 },
	},
	{
		title: "Shane",
		src: "/images/photos/shane.jpg",
		width: 400, height: 600,
		focusRegion: { left: 0.2, top: 0.2, width: 0.4, height: 0.4 },
	},
]
