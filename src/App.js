import './App.css';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Helloworld from "./pages/helloword";
import Register from './pages/Register';
import TopNavbarAdmin from './components/topNavAdmin';
import AdminHomePage from './pages/AdminHomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <TopNavbarAdmin />
          
          <Routes>
              <Route index element={<AdminHomePage />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Hello" element={<Helloworld />}></Route>
              <Route path="/Register" element={<Register />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
