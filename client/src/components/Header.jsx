import React from "react";
import { Link } from "react-router-dom";
import NavbarView from "./../components/Navbar";

const Header = () => {
  return (
    <div className="header-bg">
      <h1 className="header-text">azulej.io</h1>
      <h2>
        <i style={{ color: "#fff" }}>Your online azulejo designer</i>
      </h2>
      <Link to="#h1">
        {" "}
        <div class="bounce">
          <i class="fa fa-angle-double-down"></i>
        </div>
      </Link>
    </div>
  );
};

export default Header;
