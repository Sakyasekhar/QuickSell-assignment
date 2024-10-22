import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
