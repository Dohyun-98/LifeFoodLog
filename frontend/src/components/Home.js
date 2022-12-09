import axios from "axios";
import React from "react";
import "./css/home.css";

export const Home = () => {
  const data = [
    {
      id: 1,
      name: "홍길동",
      email: "test@test.com",
    },
    {
      id: 2,
      name: "김길동",
      email: "test@test.com",
    },
    {
      id: 3,
      name: "이길동",
      email: "test@test.com",
    },
  ];

  return (
    <div className="home">
      <div className="wrapper_dashboard">
        {data.map((item) => {
          return (
            <div>
              <div key={item.id} className={"dashboard"}>
                <div>{item.name}</div>
                <div>{item.email}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
