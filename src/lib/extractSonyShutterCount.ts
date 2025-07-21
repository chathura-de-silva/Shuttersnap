// Utility to extract Sony shutter count and camera model from a File (RAW or JPEG)
// Returns { shutterCount, cameraModel } or nulls if not found

const DSLR = 240;
const DSL5 = 241;
const DSLT = 242;
const ILC1 = 243;
const ILC2 = 244;
const ILC3 = 245;

const supportedModels: Record<string, { name: string; type: number }> = {
	'DSLR-A230': { name: 'A230', type: DSLR },
	'DSLR-A290': { name: 'A290', type: DSLR },
	'DSLR-A330': { name: 'A330', type: DSLR },
	'DSLR-A380': { name: 'A380', type: DSLR },
	'DSLR-A390': { name: 'A390', type: DSLR },
	'DSLR-A450': { name: 'A450', type: DSL5 },
	'DSLR-A500': { name: 'A500', type: DSL5 },
	'DSLR-A550': { name: 'A550', type: DSL5 },
	'DSLR-A560': { name: 'A560', type: DSLT },
	'DSLR-A580': { name: 'A580', type: DSLT },
	'DSLR-A850': { name: 'A850', type: DSLR },
	'DSLR-A900': { name: 'A900', type: DSLR },
	'NEX-3': { name: 'NEX 3', type: DSLT },
	'NEX-C3': { name: 'NEX C3', type: DSLT },
	'NEX-F3': { name: 'NEX F3', type: ILC1 },
	'NEX-3N': { name: 'NEX 3N', type: ILC1 },
	'NEX-5': { name: 'NEX 5', type: DSLT },
	'NEX-5N': { name: 'NEX 5N', type: ILC1 },
	'NEX-5R': { name: 'NEX 5R', type: ILC1 },
	'NEX-5T': { name: 'NEX 5T', type: ILC1 },
	'NEX-6': { name: 'NEX 6', type: ILC1 },
	'NEX-7': { name: 'NEX 7', type: ILC1 },
	'SLT-A33': { name: 'A 33', type: DSLT },
	'SLT-A35': { name: 'A 35', type: DSLT },
	'SLT-A37': { name: 'A 37', type: ILC1 },
	'SLT-A55': { name: 'A 55', type: DSLT },
	'SLT-A55V': { name: 'A 55V', type: DSLT },
	'SLT-A57': { name: 'A 57', type: ILC1 },
	'SLT-A58': { name: 'A 58', type: ILC1 },
	'SLT-A65': { name: 'A 65', type: ILC1 },
	'SLT-A65V': { name: 'A 65V', type: ILC1 },
	'ILCA-68': { name: 'A 68', type: ILC1 },
	'SLT-A77': { name: 'A 77', type: ILC1 },
	'SLT-A77V': { name: 'A 77V', type: ILC1 },
	'ILCA-77M2': { name: 'A 77 II', type: ILC1 },
	'SLT-A99': { name: 'A 99', type: ILC1 },
	'SLT-A99V': { name: 'A 99V', type: ILC1 },
	'ILCA-99M2': { name: 'A 99 II', type: ILC1 },
	'ILCE-3000': { name: 'A 3000', type: ILC1 },
	'ILCE-3500': { name: 'A 3500', type: ILC1 },
	'ILCE-5000': { name: 'A 5000', type: ILC1 },
	'ILCE-5100': { name: 'A 5100', type: ILC1 },
	'ILCE-6000': { name: 'A 6000', type: ILC1 },
	'ILCE-6001': { name: 'A 6000', type: ILC1 },
	'ILCE-6100': { name: 'A 6100', type: ILC2 },
	'ILCE-6300': { name: 'A 6300', type: ILC2 },
	'ILCE-6400': { name: 'A 6400', type: ILC2 },
	'ILCE-6500': { name: 'A 6500', type: ILC2 },
	'ILCE-6600': { name: 'A 6600', type: ILC2 },
	'ILCE-6700': { name: 'A 6700', type: ILC3 },
	'ILCE-7C': { name: 'A 7c', type: ILC2 },
	'ILCE-7CM2': { name: 'A 7c II', type: ILC3 },
	'ILCE-7CR': { name: 'A 7cR', type: ILC3 },
	'ILCE-7': { name: 'A 7', type: ILC1 },
	'ILCE-7M2': { name: 'A 7 II', type: ILC1 },
	'ILCE-7M3': { name: 'A 7 III', type: ILC2 },
	'ILCE-7M4': { name: 'A 7 IV', type: ILC2 },
	'ILCE-7M4A': { name: 'A 7 IVa', type: ILC2 },
	'ILCE-7R': { name: 'A 7R', type: ILC1 },
	'ILCE-7RM2': { name: 'A 7R II', type: ILC2 },
	'ILCE-7RM3': { name: 'A 7R III', type: ILC2 },
	'ILCE-7RM3A': { name: 'A 7R IIIa', type: ILC2 },
	'ILCE-7RM4': { name: 'A 7R IV', type: ILC2 },
	'ILCE-7RM4A': { name: 'A 7R IVa', type: ILC2 },
	'ILCE-7RM5': { name: 'A 7R V', type: ILC2 },
	'ILCE-7S': { name: 'A 7S', type: ILC1 },
	'ILCE-7SM2': { name: 'A 7S II', type: ILC2 },
	'ILCE-7SM3': { name: 'A 7S III', type: ILC2 },
	'ILCE-9': { name: 'A 9', type: ILC2 },
	'ILCE-9M2': { name: 'A 9 II', type: ILC2 },
	'ILCE-1': { name: 'A 1', type: ILC2 }
};

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
	if (model in supportedModels) {
		const cameraType = supportedModels[model].type;
		if (cameraType === DSLR) {
			wantedTag = 32;
			wantedAddr = 2118;
		} else if (cameraType === ILC1) {
			wantedTag = 0x9050;
			wantedAddr = 50;
			decipher = true;
		} else if (cameraType === ILC2) {
			wantedTag = 0x9050;
			wantedAddr = 58;
			decipher = true;
		} else if (cameraType === ILC3) {
			wantedTag = 0x9050;
			wantedAddr = 10;
			decipher = true;
		} else if (cameraType === DSL5) {
			wantedTag = 32;
			wantedAddr = 330;
		} else if (cameraType === DSLT) {
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
