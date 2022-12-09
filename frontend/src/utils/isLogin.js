import { getCookie } from "./cookie/cookie";

export const isLogin = () => {
  const accessToken = getCookie("accessToken");
  if (accessToken) {
    return true;
  }
  return false;
};
