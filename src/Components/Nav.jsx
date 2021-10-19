import React from "react";
import "../Styles/Nav.scss";
import imageSource from "../images/logo192.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div>
        <Link to="/">
          <img id="logo" src={imageSource} alt="logo"></img>
        </Link>
      </div>
      <div>
        <button className="login-btn">Log In</button>
      </div>
    </nav>
  );
};

export default Nav;
