// Utility to extract Sony shutter count and camera model from a File (RAW or JPEG)
// Returns { shutterCount, cameraModel } or nulls if not found

import { sonyModels, sonySeries } from './constants';

// Decipher table for encrypted shutter count
const dTable: number[] = [];
(function fillDecipherTable() {
	let i = 0;
	while (i < 249) {
		dTable.push((i * i * i) % 249);
		i++;
	}
	while (i < 256) {
		dTable.push(i);
		i++;
	}
})();
function doB(b: number) {
	return dTable.indexOf(b);
}

// Helper to read bytes as various types
function grabData(
	type: number,
	arr: Uint8Array,
	pos: number,
	size: number
): number | string | Uint8Array | undefined {
	if (type === 1) return arr[pos]; // UI8
	if (type === 2) {
		let rt = '';
		for (let i = 0; i < size; i++) rt += String.fromCharCode(arr[pos + i]);
		return rt;
	}
	if (type === 3) return arr[pos + 1] * 256 + arr[pos]; // UI16
	if (type === 4)
		return (
			arr[pos + 3] * 256 * 256 * 256 + arr[pos + 2] * 256 * 256 + arr[pos + 1] * 256 + arr[pos]
		); // UI32
	if (type === 7) return arr.slice(pos, pos + size); // UND
}

type TagValue = number | string | Uint8Array | undefined;
function parseTag(
	arr: Uint8Array,
	pos: number
): { tag: number; format: number; value: TagValue; size: number } {
	const tag = arr[pos + 1] * 256 + arr[pos];
	const format = arr[pos + 2];
	const size = arr[pos + 4] + arr[pos + 5] * 256 + arr[pos + 6] * 256 + arr[pos + 7] * 256;
	let value: TagValue = undefined;
	if (size <= 4) {
		value = grabData(format, arr, pos + 8, 4);
	} else {
		const offset = grabData(4, arr, pos + 8, 4);
		if (typeof offset === 'number') {
			value = grabData(format, arr, offset, size);
		}
	}
	if (format === 7) value = grabData(4, arr, pos + 8, 4);
	return { tag, format, value, size };
}

// Main extraction function
export async function extractSonyShutterCount(
	file: File
): Promise<{ shutterCount: number | null; cameraModel: string | null }> {
	// Read first 100kB for TIFF/EXIF parsing
	const header = await file.slice(0, 100 * 1024).arrayBuffer();
	const view = new Uint8Array(header);

	// Detect endianness
	let LEencoding: boolean | null = null;
	if (view[0] === 0x49 && view[1] === 0x49) LEencoding = true;
	if (view[0] === 0x4d && view[1] === 0x4d) LEencoding = false;
	if (LEencoding == null) return { shutterCount: null, cameraModel: null };

	// Find IFD0
	let cA = 8;
	let ifdEntries = LEencoding ? view[cA + 1] * 256 + view[cA] : view[cA + 1] + view[cA] * 256;
	cA += 2;
	let exifAddr: number | null = null;
	let model = '';
	while (ifdEntries > 0) {
		const tag = parseTag(view, cA);
		if (tag.tag === 0x8769 && typeof tag.value === 'number') exifAddr = tag.value;
		if (tag.tag === 0x0110 && typeof tag.value === 'string')
			model = tag.value.trim().replace(/\0+$/, '');
		cA += 12;
		ifdEntries--;
	}
	if (!exifAddr) return { shutterCount: null, cameraModel: model || null };

	// Find makernote in EXIF
	cA = exifAddr;
	ifdEntries = view[cA + 1] * 256 + view[cA];
	cA += 2;
	let sonyAddr: number | null = null;
	while (ifdEntries > 0) {
		const tag = parseTag(view, cA);
		if (tag.tag === 0x927c && typeof tag.value === 'number') sonyAddr = tag.value;
		cA += 12;
		ifdEntries--;
	}
	if (!sonyAddr) return { shutterCount: null, cameraModel: model || null };

	// Offset for SONY makernote
	cA = sonyAddr;
	if (
		view[sonyAddr] === 83 &&
		view[sonyAddr + 1] === 79 &&
		view[sonyAddr + 2] === 78 &&
		view[sonyAddr + 3] === 89
	)
		cA = sonyAddr + 12;

	// Find shutter count tag/offset for this model
	let wantedTag: number | null = null;
	let wantedAddr: number | null = null;
	let decipher = false;
	if (model in sonyModels) {
		const cameraType = sonyModels[model].type;
		if (cameraType === sonySeries.DSLR) {
			wantedTag = 32;
			wantedAddr = 2118;
		} else if (cameraType === sonySeries.ILC1) {
			wantedTag = 0x9050;
			wantedAddr = 50;
			decipher = true;
		} else if (cameraType === sonySeries.ILC2) {
			wantedTag = 0x9050;
			wantedAddr = 58;
			decipher = true;
		} else if (cameraType === sonySeries.ILC3) {
			wantedTag = 0x9050;
			wantedAddr = 10;
			decipher = true;
		} else if (cameraType === sonySeries.DSL5) {
			wantedTag = 32;
			wantedAddr = 330;
		} else if (cameraType === sonySeries.DSLT) {
			wantedTag = 32;
			wantedAddr = 283;
		}
	} else {
		return { shutterCount: null, cameraModel: model || null };
	}

	// Find the tag and extract the count
	cA = sonyAddr + 2;
	ifdEntries = view[sonyAddr + 1] * 256 + view[sonyAddr];
	let shutterCount: number | null = null;
	while (ifdEntries > 0) {
		const tag = parseTag(view, cA);
		if (tag.tag === wantedTag && wantedAddr != null && typeof tag.value === 'number') {
			if (decipher) {
				shutterCount =
					doB(view[tag.value + wantedAddr]) +
					doB(view[tag.value + wantedAddr + 1]) * 256 +
					doB(view[tag.value + wantedAddr + 2]) * 256 * 256;
			} else {
				shutterCount =
					view[tag.value + wantedAddr] +
					view[tag.value + wantedAddr + 1] * 256 +
					view[tag.value + wantedAddr + 2] * 256 * 256;
			}
			break;
		}
		cA += 12;
		ifdEntries--;
	}
	return { shutterCount, cameraModel: model || null };
}
