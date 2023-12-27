import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LapProvider from "./context/LapContext";

function App() {
  return (
    <LapProvider>
      <div className="bg-base-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </LapProvider>
  );
}

export default App;
