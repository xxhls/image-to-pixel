import { imageToPixel } from "./dist";

function App() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadHandler = async (e: any) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const files = target.files;
		const file = files[0];
		const url1 = await imageToPixel(file, {
			threshold: 100,
			mode: 0,
		});
		const url2 = await imageToPixel(file, {
			threshold: 100,
			mode: 1,
		});
		const url3 = await imageToPixel(file, {
			threshold: 200,
			mode: 0,
		});
		const url4 = await imageToPixel(file, {
			threshold: 200,
			mode: 1,
		});
		const urls = [url1, url2, url3, url4];
		urls.forEach((url, index) => {
			if (!url) return;
			const img = document.createElement("img");
			img.src = url;
			img.style.width = "200px";
			img.style.height = "200px";
			img.style.margin = "10px";
			document.body.appendChild(img);
			img.classList.add(`img-${index}`);
		});
	};
	return (
		<>
			<div>
				<h1>Hello Vite!</h1>
				<div>
					<input type="file" onChange={uploadHandler} />
				</div>
			</div>
		</>
	);
}

export default App;
