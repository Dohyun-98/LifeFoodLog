import React, { useEffect, useState } from "react";
import "./css/select-dashboard.css";

export const SelectDashBoard = (props) => {
  const [kcalData, setKcalData] = useState(0);

  useEffect(() => {
    // setKcalData(props.kcal);
  }, []);

  return (
    <div>
      <div className="select-dashboard">
        <div className="select-dashboard-item">
          <span className="dashboard-title">{props.title}</span>
          <div className="dashboard-container">
            <div className="total-box">
              <span>총 열량: </span>
              <span>{props.kcal} kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
