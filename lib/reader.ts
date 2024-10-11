export async function reader(file: Blob) {
	return new Promise<{
		code: number;
		msg: string;
		data: ImageData | null | undefined;
	}>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onerror = () => {
			reject({
				code: 1,
				msg: "读取失败",
				data: null,
			});
		};
		reader.onload = () => {
			const result = reader.result;
			const img = new Image();
			img.src = result as string;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				ctx?.drawImage(img, 0, 0);
				const imageData = ctx?.getImageData(0, 0, img.width, img.height);
				resolve({
					code: 0,
					msg: "读取成功",
					data: imageData,
				});
			};
			img.onerror = () => {
				reject({
					code: 1,
					msg: "读取失败",
					data: null,
				});
			};
		};
	});
}
