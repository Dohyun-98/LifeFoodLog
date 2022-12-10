import React from "react";
import "./css/selection-modal.css";

export const SelectionModal = (props) => {
  // 세로로 메인카테고리, 서브 카테고리, 이름이 보여지는 모달창
  // props로 받아온 데이터를 가지고 렌더링

  return (
    <div>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">선택창</span>
          <span
            className="modal-close"
            onClick={() => {
              props.setModalVisible(false);
            }}
          >
            X
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-select-group">
            <div className="modal-select-box">
              <div className="select-box-title">
                <span>메인카테고리</span>
              </div>
              {props.food.map((el) => {
                return (
                  <div className="select-box-item">
                    <span>{el.maincategory}</span>
                  </div>
                );
              })}
            </div>
            <div className="modal-select-box">
              <div className="select-box-title">
                <span>서브카테고리</span>
              </div>
            </div>
            <div className="modal-select-box">
              <div className="select-box-title">
                <span>이름</span>
              </div>
            </div>
          </div>
          <div className="modal-selected-group"></div>
        </div>
        <div className="modal-footer">
          <div className="modal-button-group">
            <button className="modal-footer-btn">선택</button>
            <button
              className="modal-footer-btn"
              onClick={() => props.setModalVisible(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
