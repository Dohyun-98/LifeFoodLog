import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="layout">
          <Header className="header" />
          <div className="content-box">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer className="footer" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
