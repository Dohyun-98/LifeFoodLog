import React from "react";
import "./css/board.css";

export const Board = () => (
  <div className="content">
    <div className="board">
      <div className="board-title">
        <h1>게시판</h1>
      </div>
      <div className="board-search">
        <form action="">
          <input type="text" placeholder="검색어를 입력하세요" />
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
                  <tr>
                    <td>3</td>
                    <th>
                      <a href="#!">
                        [공지사항] 개인정보 처리방침 변경안내처리방침
                      </a>
                      <p>테스트</p>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.07.13</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 작성자 1</td>
                    <td>2017.06.15</td>
                  </tr>

                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <th>
                      <a href="#!">
                        공지사항 안내입니다. 이용해주셔서 감사합니다
                      </a>
                    </th>
                    <td> 관리자 </td>
                    <td>2017.06.15</td>
                  </tr>
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
                    <span className="sr-only">이전</span>
                  </a>
                </li>
                <li className="current-page">
                  <a href="#!" className="page-link">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a href="#!" className="page-link">
                    <span className="sr-only"> 다음</span>
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
