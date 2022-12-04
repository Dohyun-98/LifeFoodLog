// header component
import React from "react";
import { Link } from "react-router-dom";
import "./css/header.css";

export const Header = () => {
  return (
    <header>
      <h1>LifeFoodLog</h1>
      <nav>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
      </nav>
    </header>
  );
};
