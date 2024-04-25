import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const [cookies] = useCookies(['login']);

  return cookies.login ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
