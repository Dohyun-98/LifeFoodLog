import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/config";
import { setCookie } from "../utils/cookie/cookie";

import "./css/login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToSignup = () => {
    navigate("/signup");
  };

  const login = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    const token = await axios
      .post(API.LOGIN, {
        email,
        password,
      })
      .catch(() => {
        alert("아이디 또는 패스워드가 틀렸습니다.");
      });
    if (token.data.access_token) {
      setCookie("accessToken", token.data.access_token, {
        HttpOnly: true,
        Expires: 60 * 20,
        MaxAge: 60 * 20,
      });
      window.location.replace("/");
    }
  };

  return (
    <div action="post" className="login-form">
      <div className="login-form-title">LifeFoodLog</div>
      <div className="login-form-input">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="login-form-button">
        <button onClick={login}>로그인</button>
        <button onClick={goToSignup}>회원가입</button>
      </div>
    </div>
  );
};
