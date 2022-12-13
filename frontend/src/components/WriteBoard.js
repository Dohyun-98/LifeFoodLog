import React from "react";
import "./css/writeboard.css";
// 글쓰기 페이지 생성
export const WriteBoard = () => {
  return (
    <div className="content">
      <div className="write-board-title">
        <h1>게시글 등록</h1>
      </div>
      <div className="write-box">
        <div className="write-title">
          <span>제목</span>
          <input type="text" placeholder="제목을 입력하세요" />
        </div>
        <div className="write-body">
          <span>내용</span>
          <textarea placeholder="내용을 입력하세요" />
        </div>
        <div className="button-group">
          <button>등록</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  );
};
