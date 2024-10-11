import { imageToPixel } from "./dist";

function App() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadHandler = async (e: any) => {
		const target = e.target as HTMLInputElement;
		if (!target.files) return;
		const files = target.files;
		const file = files[0];
		const url = await imageToPixel(file);
		const img = document.createElement("img");
		if (!url) return;
		img.src = url;
		img.onload = () => {
			document.body.appendChild(img);
		};
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
