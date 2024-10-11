import { Handler } from "./handler";
import { reader } from "./reader";
import { toDataUrl } from "./toDataUrl";

export interface Config {
	threshold?: number;
	mode?: 0 | 1;
}

export async function imageToPixel(file: Blob, config?: Config) {
	const { code, msg, data } = await reader(file);
	if (code !== 0 || !data) {
		console.error(msg);
		return null;
	}
	const handler = new Handler();
	handler.transform(data, config);
	return toDataUrl(data);
}

async function main() {
	const fs = require("node:fs");
	const { createCanvas, loadImage } = require("canvas");
	function getImagePixels(
		imagePath: string,
		callback: (imageData: ImageData) => void,
	) {
		loadImage(imagePath).then((image: ImageData) => {
			const canvas = createCanvas(image.width, image.width);
			const ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);

			const imageData = ctx.getImageData(0, 0, image.width, image.width);
			callback(imageData);
		});
	}

	// 使用示例
	getImagePixels(
		"/Users/heyongqi10/Desktop/开源练习/工具库/image2pixel/@xxhls/image2pixel/demo-cli/img.png",
		(imageData) => {
			const handler = new Handler();
			handler.transform(imageData);

			const canvas = createCanvas();
			const context = canvas.getContext("2d");
			canvas.width = imageData.width;
			canvas.height = imageData.height;
			context?.putImageData(imageData, 0, 0);
			const result = canvas.toDataURL();

			const buffer = Buffer.from(result.split(",")[1], "base64");

			fs.writeFile("output.png", buffer, () => {
				console.log("Image saved as output.png");
			});
		},
	);
}

try {
	new window.XMLHttpRequest();
	console.log("This is a browser environment.");
} catch (e) {
	console.log("This is a Node.js environment.");
	main();
}
