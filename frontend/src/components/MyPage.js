import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config/config";
import { getCookie, removeCookie } from "../utils/cookie/cookie";
import "./css/my-page.css";

export const MyPage = () => {
  const [profile, setProfile] = useState({});
  const [updateNicknamestatus, setUpdateNicknamestatus] = useState(false);
  const [updateNickname, setUpdateNickname] = useState("");
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [totalKcal, setTotalKcal] = useState(0);
  const [authNumber, setAuthNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios.get(API.GETMYPROFILE, config).catch(() => {
      alert("다시 로그인해주세요.");
      // window.location.href = "/login";
    });
    if (data) {
      setProfile(data.data);
    }
  };

  const updateNicknameFn = async () => {
    if (updateNickname === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/gi;
    if (!regex.test(updateNickname)) {
      alert("닉네임은 2~16자의 영문, 한글, 숫자만 가능합니다.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };

    const data = await axios
      .patch(API.UPDATENICKNAME, { nickname: updateNickname }, config)
      .catch(() => {
        alert("닉네임 변경에 실패했습니다.");
      });
    if (data) {
      setUpdateNicknamestatus(false);
      getMyProfile();
    }
  };

  const sendMail = async () => {
    setIsUpdatePassword(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .post(API.SENDPWMAIL, {
        email: profile.email,
      })
      .then(alert("가입된 이메일로 인증번호가 전송되었습니다."))
      .catch((err) => {
        err.response.data.statusCode === 422
          ? alert("이미 가입된 메일입니다.")
          : alert("잠시 후 다시 시도해주세요.");
      });
  };

  const validateAuthNumber = async () => {
    await axios
      .post(API.VRYMAIL, {
        email: profile.email,
        number: authNumber,
      })
      .then((res) => {
        alert("인증에 성공했습니다.");
        setIsUpdatePassword(false);
        setIsAuth(true);
      })
      .catch((err) => {
        err.response.data.statusCode === 422
          ? alert("인증번호가 일치하지 않습니다.")
          : alert("잠시 후 다시 시도해주세요.");
      });
  };

  const changePassword = async () => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/g;
    if (!regex.test(newPassword)) {
      alert("비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .patch(API.CHANGEPASSWORD, { password: newPassword }, config)
      .catch(() => {
        alert("비밀번호 변경에 실패했습니다.");
      });
    setIsAuth(false);
    alert("비밀번호가 변경되었습니다.");
  };

  const isDelete = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      if (window.confirm("탈퇴시, 모든 정보가 삭제됩니다. 탈퇴하시겠습니까?")) {
        const config = {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        };
        const data = await axios
          .delete(API.DELETEUSER, config)
          .then(() => {
            removeCookie("accessToken");
            alert("탈퇴되었습니다.");
            window.location.href = "/login";
          })
          .catch(() => {
            alert("탈퇴에 실패했습니다.");
          });
        console.log(data);
      }
    }
  };

  return (
    <div className="myprofile">
      <div className="myprofile-title">
        <h1>프로필</h1>
      </div>
      <div className="myprofile-content">
        <div className="profile-email">
          <h2>이메일</h2>
          <p>{profile.email}</p>
        </div>
        <div className="profile-nickname">
          <h2>닉네임</h2>
          {updateNicknamestatus ? (
            <input
              type="text"
              value={updateNickname}
              onChange={(e) => {
                setUpdateNickname(e.target.value);
              }}
            />
          ) : (
            <p>{profile.nickname}</p>
          )}
          {updateNicknamestatus ? (
            <button
              onClick={() => {
                setUpdateNicknamestatus(false);
                setUpdateNickname("");
              }}
            >
              취소
            </button>
          ) : (
            <button
              onClick={() => {
                setUpdateNicknamestatus(true);
                setUpdateNickname(profile.nickname);
              }}
            >
              변경하기
            </button>
          )}
          {updateNicknamestatus ? (
            <button
              onClick={() => {
                updateNicknameFn();
              }}
            >
              확인
            </button>
          ) : null}
        </div>
        <div className="profile-password">
          {isUpdatePassword ? (
            <h2>인증번호</h2>
          ) : !isAuth ? (
            <h2>비밀번호</h2>
          ) : (
            <h2>새 비밀번호</h2>
          )}
          {isUpdatePassword && !isAuth ? (
            <input
              type="text"
              placeholder="인증번호"
              value={authNumber}
              onChange={(e) => setAuthNumber(e.target.value)}
            />
          ) : null}
          {isAuth ? (
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          ) : null}
          {isUpdatePassword ? (
            <button
              onClick={() => {
                setIsUpdatePassword(false);
                setAuthNumber("");
              }}
            >
              취소
            </button>
          ) : isAuth ? (
            <button
              onClick={() => {
                setIsAuth(false);
                setAuthNumber("");
              }}
            >
              취소
            </button>
          ) : (
            <button onClick={sendMail}>변경하기</button>
          )}
          {isUpdatePassword ? (
            <button
              onClick={() => {
                validateAuthNumber();
              }}
            >
              확인
            </button>
          ) : null}
          {isAuth ? <button onClick={changePassword}>변경</button> : null}
        </div>
        <div className="guide-text-box">
          <p>회원탈퇴는 언제든지 가능합니다.</p>
          <button onClick={isDelete}>회원탈퇴</button>
        </div>
        <div className="total-avg">
          <div className="total-avg-content">
            <h2>전체 평균 칼로리</h2>
            <p>
              {profile.nickname}님은 전체 평균 하루 {totalKcal}kcal 입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
