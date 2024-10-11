import { EMode } from "./enums";

export class Handler {
	private threshold = 128;
	private mode: EMode = EMode.GRAY;

	public transform(
		imageData: ImageData,
		config?: {
			threshold?: number;
			mode?: EMode;
		},
	) {
		if (config) {
			this.threshold = config.threshold || this.threshold;
			this.mode = config.mode || this.mode;
		}
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			const red = data[i];
			const green = data[i + 1];
			const blue = data[i + 2];
			const alpha = data[i + 3];

			const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

			const color = gray >= this.threshold ? 255 : 0;

			data[i] = this.mode === 0 && color === 0 ? red : color;
			data[i + 1] = this.mode === 0 && color === 0 ? green : color;
			data[i + 2] = this.mode === 0 && color === 0 ? blue : color;
			data[i + 3] = alpha >= this.threshold ? 255 : 0;
		}
	}
}
