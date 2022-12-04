import React from "react";

import "./css/login.css";

export const Login = () => {
  return (
    <form action="post" className="login-form">
      <div className="login-form-title">LifeFoodLog</div>
      <div className="login-form-input">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
      </div>
      <div className="login-form-button">
        <button>로그인</button>
        <button formAction="/signup">회원가입</button>
      </div>
    </form>
  );
};
