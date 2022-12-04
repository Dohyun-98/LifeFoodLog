import { Header } from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";

import "./app.css";
import { Login } from "./components/login";
import { Signup } from "./components/signup";

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
