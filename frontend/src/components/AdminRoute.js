/** react v6 이후 Private Route */
import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/unauth/isAdmin";

export const AdminRoute = ({ component: Component, ...props }) => {
  const admin = isAdmin();
  return admin ? <Component /> : <Navigate to="/401" />;
};
