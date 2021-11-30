import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeView/>} />
            <Route path="/login" element={<LoginView/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
