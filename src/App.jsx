import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LapProvider from './context/LapContext';
import ThemeContextProvider from './context/ThemeContext';

function App() {
  return (
    <LapProvider>
      <ThemeContextProvider>
        <div className="bg-base-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </ThemeContextProvider>
    </LapProvider>
  );
}

export default App;
