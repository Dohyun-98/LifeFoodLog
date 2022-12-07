import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/signup.css";
import { API } from "../config/config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [disableSignup, setDisableSignup] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [passwordCheckValid, setPasswordCheckValid] = useState(false);
  const [authNumberValid, setAuthNumberValid] = useState(false);

  useEffect(() => {
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/g;
    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [password]);

  useEffect(() => {
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/gi;
    if (regex.test(nickName)) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  }, [nickName]);

  useEffect(() => {
    if (password === passwordCheck) {
      setPasswordCheckValid(true);
    } else {
      setPasswordCheckValid(false);
    }
  }, [passwordCheck, password]);

  useEffect(() => {
    if (
      authNumberValid &&
      passwordValid &&
      nickNameValid &&
      passwordCheckValid
    ) {
      setDisableSignup(false);
    } else {
      setDisableSignup(true);
    }
  }, [authNumberValid, passwordValid, nickNameValid, passwordCheckValid]);

  const sendEmail = async () => {
    if (!emailValid) {
      return;
    }
    const checkClick = document.getElementById("send").value;
    if (checkClick === "false") {
      document.getElementById("send").value = "true";
      setIsClicked(true);
    }
    setDisableInput(true);
    await axios
      .post(API.SENDMAIL, {
        email: email,
      })
      .then(alert("인증번호가 전송되었습니다."))
      .catch((err) => {
        err.response.data.statusCode === 422
          ? alert("이미 가입된 메일입니다.")
          : alert("잠시 후 다시 시도해주세요.");
      });
  };

  const Certification = async () => {
    await axios
      .post(API.VRYMAIL, {
        email: email,
        number: authNumber,
      })
      .then((res) => {
        const checkClick = document.getElementById("send").value;
        if (checkClick === "true") {
          document.getElementById("send").value = "false";
          setIsClicked(false);
          setAuthNumberValid(true);
        }
      })
      .catch((err) => {
        err.response.data.statusCode === 422
          ? alert("인증번호가 일치하지 않습니다.")
          : alert("인증번호를 다시 입력해주세요.");
      });
  };

  const signUp = async () => {
    if (disableSignup) {
      return;
    }
    await axios
      .post(API.SIGNUP, {
        email: email,
        password: password,
        nickname: nickName,
      })
      .catch((err) => {
        err.response.data.message === "not auth"
          ? alert("메일 인증 후 회원가입이 가능합니다.")
          : err.response.data.message === "already exist email"
          ? alert("이미 가입된 이메일입니다.")
          : alert("이미 존재하는 닉네임입니다.");
        return;
      });
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

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
            disabled={disableInput}
          />
          <div className="auth-mail">
            <button
              id="send"
              value={"false"}
              onClick={sendEmail}
              disabled={authNumberValid}
              style={{
                backgroundColor: authNumberValid ? "#d9d9d9" : "#f9f9f9",
                fontSize: isClicked ? "0.7rem" : "0.8rem",
              }}
            >
              {authNumberValid ? "인증완료" : isClicked ? "재전송" : "인증"}
            </button>
          </div>
        </div>
        <div className="danger-message-form">
          {!emailValid && email.length > 0 && (
            <span>올바른 이메일을 입력해주세요</span>
          )}
        </div>
        {isClicked && (
          <div className={"email-form"} id="input-parent">
            <input
              type="text"
              placeholder="인증번호"
              onChange={(e) => {
                setAuthNumber(e.target.value);
              }}
            />
            <div className={"auth-mail"} id="button-parent">
              <button onClick={Certification}>인증</button>
            </div>
          </div>
        )}
        {isClicked && (
          <div className={"danger-message-form"} id="auth-number-message"></div>
        )}
        <input
          type="text"
          placeholder="nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <div className="danger-message-form">
          {!nickNameValid && nickName.length > 0 && (
            <span>2~16자, 특수문자를 제외한 영문자를 포함합니다.</span>
          )}
        </div>
        <input
          type="password"
          placeholder="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="danger-message-form">
          {!passwordValid && password.length > 0 && (
            <span>
              8자이상 16이하 최소 1자이상의 영문자,숫자,특수문자를 포함합니다.
            </span>
          )}
        </div>
        <input
          type="password"
          placeholder="password check"
          id="passwordCheck"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <div className="danger-message-form">
          {!passwordCheckValid && passwordCheck.length > 0 && (
            <span>패스워드가 일치하지 않습니다.</span>
          )}
        </div>
      </div>
      <div className="signup-form-button">
        <button
          disabled={disableSignup}
          onClick={signUp}
          style={
            disableSignup
              ? { backgroundColor: "#d9d9d9" }
              : { backgroundColor: "#f9f9f9" }
          }
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
