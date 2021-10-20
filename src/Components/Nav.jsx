import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../Styles/Nav.scss";
import imageSource from "../images/logo192.png";
import { Link } from "react-router-dom";

const Nav = () => {
  const { userLogin } = useContext(UserContext);
  return (
    <nav>
      <div>
        <Link to="/">
          <img id="logo" src={imageSource} alt="logo"></img>
        </Link>
      </div>
      <div>
        <Link to="/user">
          <button className="login-btn">
            {userLogin.loggedIn ? userLogin.user.username : "Log In"}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
