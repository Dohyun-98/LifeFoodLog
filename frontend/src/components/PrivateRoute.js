/** react v6 이후 Private Route */
import React from "react";
import { Navigate } from "react-router-dom";
import { isLogin } from "../utils/unauth/isLogin";

export const PrivateRoute = ({ component: Component, ...props }) => {
  const login = isLogin();
  return login ? <Component /> : <Navigate to="/login" />;
};
