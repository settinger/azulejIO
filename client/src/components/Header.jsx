import React from "react";
import { Link } from "react-router-dom";
import NavbarView from "./../components/Navbar";

const Header = () => {
  return (
    <div className="header-bg">
      <h1 className="header-text">azulej.io</h1>
      <h2 style={{ color: "#fff" }}>
        <i>Your online azulejo designer</i>
      </h2>
    </div>
  );
};

export default Header;
