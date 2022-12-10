import React, { useState } from "react";
import "./css/select-dashboard.css";

export const SelectDashBoard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const setBreakfast = () => {
    console.log("아침");
  };
  const setLunch = () => {
    console.log("점심");
  };
  const setDinner = () => {
    console.log("저녁");
  };

  return (
    <div>
      <div className="select-dashboard" onClick={() => setModalVisible(true)}>
        <div className="select-dashboard-item">
          <span className="dashboard-title">{props.title}</span>
          <div className="dashboard-container">
            <span className="select-food">햄버거</span>
            <span className="select-kcal">500</span>
          </div>
          <span className="dashboard-desc">Choose what you eat</span>
        </div>
      </div>
    </div>
  );
};
