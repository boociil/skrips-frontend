import './App.css';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminHomePage from './pages/AdminHomePage';
import Train from './pages/Train';
import AddKegiatan from './pages/AddKegiatan';
import Users from './pages/Users';
import Mitra from './pages/Mitra';
import Rekap from './pages/Rekap';
import RekapWithID from './pages/RekapWithID';
import TestPage from './pages/TestPage';
import AssignPetugasSensus from './pages/AssignPetugasSensus';
import SampelPage from './pages/Sampel';
import DashboardWithId from './pages/DashboardWithId';
import { useCookies } from 'react-cookie';
import NotFound from './pages/NotFound';
import AddMitra from './pages/AddMitra';
import PrivateRoutes from './components/PrivateRoutes'
import AdminRoutes from './components/AdminRoutes';
import PengawasRoutes from './components/PengawasRoutes';
import UpdateKegiatan from './pages/UpdateKegiatan';
import UsersWithId from './pages/UsersWithId';
import MyProfile from './pages/MyProfile';
import EditMitra from './pages/EditMitra'
import { AuthProvider } from './components/AuthContext';


function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>

            <Routes>

              {/* Routes untuk login page */}
              <Route index element={<Login />}></Route>


              {/* Routes selain login page, yang harus login terlebih dahulu */}
              <Route element={<PrivateRoutes />}>
                <Route path="/Home" element={<AdminHomePage />}></Route>
                <Route path="/Home/:id_kegiatan" element={<DashboardWithId />}></Route>
                <Route path="/Train" element={<Train />}></Route>

                {/* Routes Pengaaws */}
                <Route element={<PengawasRoutes />}>
                  <Route path="/Rekap/AddKegiatan" element={<AddKegiatan />}></Route>
                  <Route path="/Mitra" element={<Mitra />} />
                  <Route path="/Mitra/Register" element={<AddMitra />} />
                  <Route path="/Rekap" element={<Rekap />} />
                  <Route path="/Rekap/:id" element={<RekapWithID />} />
                  <Route path="/Rekap/Update/:id" element={<UpdateKegiatan />} />
                  {/* <Route path="/AssignPetugas/:id" element={<AssignPetugasSensus />} /> */}
                  <Route path="/Rekap/Sampel/:id" element={<SampelPage />} />
                </Route>

                {/* Routes Admin */}
                <Route element={<AdminRoutes />}>
                  <Route path='/Users' element={<Users />} />
                  <Route path="/Users/Register" element={<Register />}/>
                  <Route path="/Users/:username" element={<UsersWithId />}/>
                  <Route path="/Mitra/Edit/:id/:nama/:status/:start/:end" element={<EditMitra />}/>
                </Route>

                <Route path="/MyProfile" element={<MyProfile />}></Route>

                {/* Ketika pengguna mengakses routes yang tidak terdaftar */}
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
