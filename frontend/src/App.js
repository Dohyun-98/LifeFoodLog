import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

import "./app.css";
import { NotFound } from "./components/errors/404";
import { Home } from "./components/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import { MyPage } from "./components/MyPage";

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
              <Route
                path="/mypage"
                element={<PrivateRoute component={MyPage} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
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
