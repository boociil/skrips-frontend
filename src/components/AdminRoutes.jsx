import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminRoutes = () => {
  const [cookies] = useCookies(['isLogin']);

  return (cookies.role === "Admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/Home" />
  );
};

export default AdminRoutes;
