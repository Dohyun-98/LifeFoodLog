import jwt_decode from "jwt-decode";
import { getCookie } from "../cookie/cookie";

export const isAdmin = () => {
  const accessToken = getCookie("accessToken");
  if (accessToken) {
    const decoded = jwt_decode(accessToken);
    if (decoded.role === "admin") {
      return true;
    }
  }

  return false;
};
