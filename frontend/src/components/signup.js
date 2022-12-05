import React, { useState } from "react";
import "./css/signup.css";
let isAddAuth = false;
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

async function sendEmail() {
  // 이메일 인증 엘리먼트 추가
  if (!isAddAuth) {
    const input = document.getElementById("input-parent");
    const button = document.getElementById("button-parent");
    input.classList.remove("display-disable");
    button.classList.remove("display-disable");

    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("placeholder", "인증번호");
    input.prepend(newInput);

    const newButton = document.createElement("button");
    newButton.innerHTML = "인증";
    newButton.onclick = checkEmail;
    button.appendChild(newButton);

    // 전송을 재전송으로 변경
    document.getElementById("send").innerHTML = "재전송";
  }
  isAddAuth = true;
}

async function checkEmail() {
  // 이메일 인증 엘리먼트 삭제
  if (isAddAuth) {
    const input = document.getElementById("input-parent");
    const button = document.getElementById("button-parent");

    input.removeChild(document.getElementById("input-parent").firstChild);
    button.removeChild(document.getElementById("button-parent").firstChild);

    document.getElementById("send").innerHTML = "전송";
    input.classList.add("display-disable");
    button.classList.add("display-disable");
  }
  isAddAuth = false;
}

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <div className="signup-form">
      <div className="signup-form-title">LifeFoodLog</div>
      <div className="signup-form-input">
        <div className="email-form">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="auth-mail">
            <button id="send" onClick={sendEmail}>
              전송
            </button>
          </div>
        </div>
        <div className="email-form display-disable" id="input-parent">
          <div className="auth-mail display-disable" id="button-parent"></div>
        </div>
        <input
          type="text"
          placeholder="nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onInput={isPasswordSame}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="password check"
          id="passwordCheck"
          onInput={isPasswordSame}
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <span id="same"></span>
      </div>
      <div className="signup-form-button">
        <button>회원가입</button>
      </div>
    </div>
  );
};
