import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import axios from "axios";
import "./css/board-detail.css";
import { isExpiration } from "../utils/cookie/is-expiration";

export const BoardDetail = () => {
  const navigate = useNavigate();
  const boardId = useParams().id;
  const [isUpdate, setIsUpdate] = useState(false);
  const [isMyBoard, setIsMyBoard] = useState(false);
  const [boardData, setBoardData] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comment, setComment] = useState([]);
  const [createComment, setCreateComment] = useState("");
  const [updateCommentStatus, setUpdateCommentStatus] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState("");

  useEffect(() => {
    getBoardDetail();
    getIsMyBoard();
    getComment();
  }, []);

  const getBoardDetail = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.GETBOARDDETAIL + `/${boardId}`, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
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
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
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
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
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
    await axios.delete(API.DELETEBOARD + `/${boardId}`, config).catch((err) => {
      isExpiration(err.response.data.statusCode);
    });
    alert("게시글이 삭제되었습니다.");
    navigate("/board");
  };

  const getComment = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(API.COMMENT + `/${boardId}`, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    setComment(data.data);
  };

  const addComment = async () => {
    if (!createComment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (createComment.length > 60) {
      alert("댓글은 60자 이내로 입력해주세요.");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .post(API.COMMENT, { board: boardId, text: createComment }, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    setCreateComment("");
    getComment();
  };

  const changeUpdateStatus = (text) => {
    if (updateCommentStatus) {
      alert("다른 댓글수정창을 닫아주세요.");
      return;
    }
    setUpdateComment(text);
    setUpdateCommentStatus(true);
  };

  const finalUpdateComment = async (id) => {
    if (!updateComment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (updateComment.length > 60) {
      alert("댓글은 60자 이내로 입력해주세요.");

      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios
      .patch(API.COMMENT, { id, text: updateComment }, config)
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    setUpdateComment("");
    setUpdateCommentStatus(false);
    getComment();
  };

  const deleteComment = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    await axios.delete(API.COMMENT + `/${id}`, config).catch((err) => {
      isExpiration(err.response.data.statusCode);
    });
    getComment();
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
              {boardData.updatedAt
                ? boardData.updatedAt.split("T")[0] +
                  " " +
                  boardData.updatedAt.split("T")[1].split(".")[0]
                : ""}
            </div>
          </div>
        </div>
        <div className="detail-content-box">
          <div className="detail-content">내용</div>
          {!isUpdate ? (
            <div className="detail-content-content">{boardData.content}</div>
          ) : (
            <textarea
              spellCheck="false"
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

        {comment.map((item) => {
          return (
            <div className="comment-box" key={item.id}>
              <div className="comment-nickname">
                <span>{item.user.nickname}</span>
              </div>
              <div
                className="comment-text"
                style={item.isMine ? { width: "80%" } : { width: "90%" }}
              >
                {item.isMine &&
                updateCommentStatus &&
                item.id === updateCommentId ? (
                  <input
                    type="text"
                    value={updateComment}
                    onChange={(e) => {
                      setUpdateComment(e.target.value);
                    }}
                  />
                ) : (
                  <span>{item.text}</span>
                )}
                <span className="comment-time">
                  {item.updatedAt
                    ? item.updatedAt.split("T")[0] +
                      " " +
                      item.updatedAt.split("T")[1].split(".")[0]
                    : ""}
                </span>
              </div>
              {item.isMine && !updateCommentStatus ? (
                <div className="comment-button-two">
                  <button
                    onClick={() => {
                      changeUpdateStatus(item.text);
                      setUpdateCommentId(item.id);
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("정말 삭제하시겠습니까?")) {
                        deleteComment(item.id);
                      }
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : null}
              {item.isMine &&
              updateCommentStatus &&
              updateCommentId === item.id ? (
                <div className="comment-button-two">
                  <button
                    onClick={() => {
                      finalUpdateComment(item.id);
                    }}
                  >
                    확인
                  </button>
                  <button
                    onClick={() => {
                      setUpdateCommentStatus(false);
                      setUpdateComment("");
                      setUpdateCommentId(0);
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
        <div className="comment-input">
          <div className="comment-nickname">
            <span>댓글 달기</span>
          </div>
          <div className="comment-input-text">
            <input
              type="text"
              className="comment-input"
              value={createComment}
              onChange={(e) => setCreateComment(e.target.value)}
            />
          </div>
          <div className="comment-button">
            <button className="comment-button" onClick={addComment}>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
