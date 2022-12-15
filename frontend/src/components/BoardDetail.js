import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import axios from "axios";
import "./css/board-detail.css";

export const BoardDetail = () => {
  const navigate = useNavigate();
  const boardId = useParams().id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isMyBoard, setIsMyBoard] = useState(false);
  const [boardData, setBoardData] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    getBoardDetail();
    getIsMyBoard();
  }, []);

  const getBoardDetail = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.GETBOARDDETAIL + `/${boardId}`, config)
      .catch(() => {
        alert("게시글 불러오기에 실패했습니다.");
      });
    if (!data.data) {
      alert("게시글 불러오기에 실패했습니다.");
      return;
    }

    setBoardData(data.data);
  };

  const getIsMyBoard = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.ISMYBOARD + `/${boardId}`, config)
      .catch(() => {
        alert("게시글 불러오기에 실패했습니다.");
      });
    setIsMyBoard(data.data);
  };

  const boardUpdateStatus = () => {
    setIsUpdate(true);
    setTitle(boardData.title);
    setBody(boardData.content);
  };

  const updateMyboard = async () => {
    if (!title || !body) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .patch(API.UPDATEBOARD + `/${boardId}`, { title, content: body }, config)
      .catch(() => {
        alert("게시글 수정에 실패했습니다.");
      });
    setIsUpdate(false);
    getBoardDetail();
  };

  const deleteMyBoard = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios.delete(API.DELETEBOARD + `/${boardId}`, config).catch(() => {
      alert("게시글 삭제에 실패했습니다.");
    });
    alert("게시글이 삭제되었습니다.");
    navigate("/board");
  };

  return (
    <div className="board-detail">
      <div className="board-detail-box">
        <div className="detail-title-box">
          {!isUpdate ? (
            <div className="detail-title-content">{boardData.title}</div>
          ) : (
            <input
              type="text"
              className="detail-title-content update-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>
        <div className="writer-create-time-box">
          <div className="writer">
            <div className="detail-writer">작성자</div>
            <div className="detail-writer-content">
              {boardData.user ? boardData.user.nickname : ""}
            </div>
          </div>
          <div className="create-time">
            <div className="detail-create-time">작성일</div>
            <div className="detail-create-time-content">
              {boardData.updatedAt ? boardData.updatedAt.split("T")[0] : ""}
            </div>
          </div>
        </div>
        <div className="detail-content-box">
          <div className="detail-content">내용</div>
          {!isUpdate ? (
            <div className="detail-content-content">{boardData.content}</div>
          ) : (
            <textarea
              className="detail-content-content update-content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          )}
        </div>
        <div className="detail-button-box">
          <div className="button-group-box">
            {isMyBoard && !isUpdate ? (
              <div
                className="detail-button"
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    deleteMyBoard();
                  }
                }}
              >
                삭제
              </div>
            ) : null}
            {isMyBoard && !isUpdate ? (
              <div
                className="detail-button"
                onClick={() => boardUpdateStatus()}
              >
                수정
              </div>
            ) : null}
            {!isUpdate ? (
              <div className="detail-button" onClick={() => navigate(-1)}>
                목록
              </div>
            ) : (
              <div className="detail-button" onClick={() => setIsUpdate(false)}>
                취소
              </div>
            )}
            {!isUpdate ? null : (
              <div className="detail-button" onClick={() => updateMyboard()}>
                확인
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
