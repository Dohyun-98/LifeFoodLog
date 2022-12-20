import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../config/config";
import { getCookie } from "../utils/cookie/cookie";
import { isExpiration } from "../utils/cookie/is-expiration";
import "./css/board.css";

export const Board = () => {
  const pageLimit = 8;

  const [boardData, setBoardData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currnetPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isFirstPage, setIsFirstPage] = useState(true);

  useEffect(() => {
    getBoardData(currnetPage, pageLimit);
    getLastPage();
  }, [currnetPage, pageLimit]);

  useEffect(() => {
    if (currnetPage === 1) {
      setIsFirstPage(true);
    } else {
      setIsFirstPage(false);
    }
    if (currnetPage === lastPage) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [currnetPage, lastPage]);

  const getLastPage = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };
    const data = await axios
      .get(
        API.GETBOARDLIST + "/maxpage",
        { params: { limit: pageLimit } },
        config
      )
      .catch((err) => {
        isExpiration(err.response.data.statusCode);
      });
    setLastPage(data.data);
  };

  const getBoardData = async (page, limit) => {
    const data = await axios.get(API.GETBOARDLIST, {
      params: {
        page,
        limit,
      },
    });
    setBoardData(data.data);
  };

  const nextPage = () => {
    setCurrentPage(currnetPage + 1);
    getBoardData(currnetPage + 1, pageLimit);
  };

  const prePage = () => {
    setCurrentPage(currnetPage - 1);
    getBoardData(currnetPage - 1, pageLimit);
  };

  const moveBoardDetail = (id) => {
    window.location.href = `/board/${id}`;
  };

  return (
    <div className="content">
      <div className="board">
        <div className="board-title">
          <h1>게시판</h1>
        </div>
        <div className="board-search">
          <form action="">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">검색</button>
          </form>
        </div>
        <div className="board-content">
          <section className="notice">
            <div id="board-list">
              <div className="container">
                <table className="board-table">
                  <thead>
                    <tr>
                      <th scope="col" className="th-num">
                        번호
                      </th>
                      <th scope="col" className="th-title">
                        제목
                      </th>
                      <th scope="col" className="th-text">
                        작성자
                      </th>
                      <th scope="col" className="th-date">
                        등록일
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {boardData.map((data, index) => {
                      return (
                        <tr
                          key={data.id}
                          onClick={() => moveBoardDetail(data.id)}
                        >
                          <td>{data.id}</td>
                          <th className="th-content-title">
                            <a href="#!">
                              {data.title.length > 43
                                ? data.title.slice(0, 40) + "..."
                                : data.title}
                            </a>
                          </th>
                          <td>{data.user.nickname}</td>
                          <td>{data.updatedAt.split("T")[0]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="write-button-box">
                  <a href="/board/write" className="write-button">
                    등록
                  </a>
                </div>
                <ul className="page-ul">
                  <li className="page-item">
                    <a href="#!" className="page-link">
                      <span
                        onClick={(e) => prePage()}
                        className={isFirstPage ? "non-active" : ""}
                      >
                        이전
                      </span>
                    </a>
                  </li>
                  <li className="current-page">
                    <a href="#!" className="page-link">
                      {currnetPage}
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#!" className="page-link">
                      <span
                        className={isLastPage ? "non-active" : ""}
                        onClick={(e) => nextPage()}
                      >
                        {" "}
                        다음
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
