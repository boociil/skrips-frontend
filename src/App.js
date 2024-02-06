import './App.css';
import Layout from './pages/Layout';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Helloworld from "./pages/helloword";
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Layout />
          <Routes>
              <Route index element={<Login />}></Route>
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
