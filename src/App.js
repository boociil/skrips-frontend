import './App.css';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Helloworld from "./pages/helloword";
import Register from './pages/Register';
import TopNavbarAdmin from './components/topNavAdmin';
import AdminHomePage from './pages/AdminHomePage';
import Train from './pages/Train';
import AddKegiatan from './pages/AddKegiatan';
import Users from './pages/Users';
import Mitra from './pages/Mitra';
import Rekap from './pages/Rekap';
import RekapWithID from './pages/RekapWithID';


function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <TopNavbarAdmin />
          
          <Routes>
              <Route index element={<Login />}></Route>
              <Route path="/Home" element={<AdminHomePage />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Hello" element={<Helloworld />}></Route>
              <Route path="/Rekap/AddKegiatan" element={<AddKegiatan />}></Route>
              <Route path="/Train" element={<Train />}></Route>
              <Route path="/Users" element={<Users />}/>
              <Route path="/Users/Register" element={<Register />}/>
              <Route path="/Mitra" element={<Mitra />} />
              <Route path="/Rekap" element={<Rekap />} />
              <Route path="/Rekap/:id" element={<RekapWithID />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
