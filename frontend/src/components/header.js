// header component
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeCookie } from "../utils/cookie/cookie";
import { isLogin } from "../utils/isLogin";
import "./css/header.css";

export const Header = () => {
  const [isLoginValid, setIsLoginValid] = useState(false);

  const logout = () => {
    removeCookie("accessToken");
    setIsLoginValid(false);
    window.location.replace("/login");
  };

  useEffect(() => {
    const login = isLogin();
    if (login) setIsLoginValid(true);
  }, []);

  return (
    <header>
      <h1>
        <Link to="/" className="title-link">
          LifeFoodLog
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            {isLoginValid ? (
              <Link to="/" className="link">
                Home
              </Link>
            ) : (
              <div></div>
            )}
          </li>
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
