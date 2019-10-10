import React from "react";
import { Link } from "react-router-dom";
import NavbarView from "./../components/Navbar";

const Header = () => {
  return (
    <div className="header-bg">
      <h1 className="header-text">azulej.io</h1>
      <div>
        <h2
          style={{
            color: "#fff",
            margin: "0 40px"
          }}
        >
          <i>Your online azulejo designer</i>
        </h2>
      </div>
    </div>
  );
};

export default Header;
