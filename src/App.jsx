import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import LapProvider from "./context/LapContext";

function App() {
	return (
		<LapProvider>
			<div className="bg-base-100">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</LapProvider>
	);
}

export default App;