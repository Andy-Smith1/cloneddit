import React from "react";
import "../Styles/Nav.css";

const Nav = () => {
  return (
    <nav>
      <div>
        <img id="logo" src="logo192.png" alt="logo"></img>
      </div>
      <div>
        <button className="login-btn">Log In</button>
      </div>
    </nav>
  );
};

export default Nav;
