import { Handler } from "./handler";
import { reader } from "./reader";
import { toDataUrl } from "./toDataUrl";

export async function imageToPixel(file: Blob) {
	const { code, msg, data } = await reader(file);
	if (code !== 0 || !data) {
		console.error(msg);
		return null;
	}
	const handler = new Handler();
	handler.transform(data);
	return toDataUrl(data);
}
