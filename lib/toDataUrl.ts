export function toDataUrl(imageData: ImageData) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	context?.putImageData(imageData, 0, 0);
	return canvas.toDataURL();
}
