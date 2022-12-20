// header component
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeCookie } from "../utils/cookie/cookie";
import { isAdmin } from "../utils/unauth/isAdmin";
import { isLogin } from "../utils/unauth/isLogin";
import "./css/header.css";

export const Header = () => {
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isAdminValid, setIsAdminValid] = useState(false);

  const logout = () => {
    removeCookie("accessToken");
    setIsLoginValid(false);
    window.location.replace("/login");
  };

  useEffect(() => {
    const login = isLogin();
    if (login) setIsLoginValid(true);
    const admin = isAdmin();
    if (admin) setIsAdminValid(true);
    else setIsAdminValid(false);
  }, []);

  return (
    <header>
      <h1>
        <Link to="/" className="title-link">
          MyKcaLog
        </Link>
      </h1>
      <nav>
        <ul>
          {isAdminValid ? (
            <li>
              <Link to="/admin" className="link">
                관리자 페이지
              </Link>
            </li>
          ) : null}
          <li>
            {isLoginValid ? (
              <Link to="/board" className="link">
                게시판
              </Link>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {isLoginValid ? (
              <Link to="/mypage" className="link">
                마이페이지
              </Link>
            ) : (
              <Link to="/signup" className="link">
                회원가입
              </Link>
            )}
          </li>
          <li>
            {isLoginValid ? (
              <Link onClick={logout}> 로그아웃 </Link>
            ) : (
              <Link to="/login" className="link">
                로그인
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
