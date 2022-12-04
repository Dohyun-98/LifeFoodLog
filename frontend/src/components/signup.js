import React from "react";
import "./css/signup.css";

function isPasswordSame() {
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("passwordCheck").value;
  if (password === passwordCheck) {
    document.getElementById("same").innerHTML = "비밀번호가 일치합니다.";
    return true;
  } else {
    document.getElementById("same").innerHTML = "비밀번호가 일치하지 않습니다.";
    return false;
  }
}

export const Signup = () => {
  return (
    <form action="post" className="signup-form">
      <div className="signup-form-title">LifeFoodLog</div>
      <div className="signup-form-input">
        <div className="email-form">
          <input type="email" placeholder="email" />
          <div className="auth-mail">
            <button>전송</button>
            <button>확인</button>
          </div>
        </div>
        <input type="text" placeholder="인증번호" />
        <input type="password" placeholder="password" id="password" />
        <input
          type="password"
          placeholder="password check"
          id="passwordCheck"
          onInput={isPasswordSame}
        />
        <span id="same"></span>
      </div>
      <div className="signup-form-button">
        <button>회원가입</button>
      </div>
    </form>
  );
};
