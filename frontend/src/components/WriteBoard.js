import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import "./css/writeboard.css";
// 글쓰기 페이지 생성
export const WriteBoard = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const cancel = () => {
    navigate("/board");
  };

  const createBoard = async () => {
    if (!title || !body) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .post(
        API.CREATEBOARD,
        {
          title,
          content: body,
        },
        config
      )
      .catch(() => {
        alert("게시글 등록에 실패했습니다.");
      });

    if (!data.data) {
      alert("게시글 등록에 실패했습니다.");
      return;
    }

    navigate("/board");
  };

  return (
    <div className="write-box-content">
      <div className="write-board-title">
        <h1>게시글 등록</h1>
      </div>
      <div className="write-box">
        <div className="write-title">
          <span>제목</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="write-body">
          <span>내용</span>
          <textarea
            placeholder="내용을 입력하세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button onClick={() => cancel()}>취소</button>
          <button
            onClick={() => {
              createBoard();
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
