import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PengawasRoutes = () => {
  const [cookies] = useCookies(['isLogin']);

  return (cookies.role === "Pengawas" || cookies.role === "Admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/Home" />
  );
};

export default PengawasRoutes;
