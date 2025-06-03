import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import CursosPage from './pages/CursosPage/CursosPage.jsx';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/CursosPage" element={<CursosPage />} />
      </Routes>
    </Router>
  );
}

export default App;