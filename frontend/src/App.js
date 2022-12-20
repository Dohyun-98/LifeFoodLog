import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./app.css";
import { NotFound } from "./components/errors/404";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import { MyPage } from "./components/MyPage";
import { Board } from "./components/Board";
import { WriteBoard } from "./components/WriteBoard";
import { BoardDetail } from "./components/BoardDetail";
import { Forbidden } from "./components/errors/401";
import { AdminRoute } from "./components/AdminRoute";
import { AdminPage } from "./components/AdminPage";

// PrivateRoute로 / 접근
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="layout">
          <Header isLogin className="header" />
          <div className="content-box">
            <Routes>
              <Route path="/" element={<PrivateRoute component={Home} />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route
                path="/mypage"
                element={<PrivateRoute component={MyPage} />}
              />
              <Route
                path="/board"
                element={<PrivateRoute component={Board} />}
              />
              <Route
                path="/board/write"
                element={<PrivateRoute component={WriteBoard} />}
              />
              <Route
                path="/board/:id"
                element={<PrivateRoute component={BoardDetail} />}
              />
              <Route
                path="/admin"
                element={<AdminRoute component={AdminPage} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/401" element={<Forbidden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer className="footer" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
