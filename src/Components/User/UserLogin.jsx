import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUser } from "../../utils/api";
import "../../Styles/UserLogin.scss";

const UserLogin = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const { setUserLogin } = useContext(UserContext);

  const handleLogIn = (e) => {
    e.preventDefault();
    setUserNotFound(false);
    getUser(usernameInput)
      .then((userFromApi) => {
        setUsernameInput("");
        setUserLogin(() => {
          return { loggedIn: true, user: userFromApi };
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setUsernameInput("");
          setUserNotFound(true);
        }
      });
  };

  return (
    <section className="UserLogin">
      <h2>Log In</h2>
      <form onSubmit={handleLogIn}>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          value={usernameInput}
          autoComplete="off"
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Guest? Try 'jessjelly'"
          required
        />

        <button>GO</button>
        {userNotFound && <p className="not-found">User not found</p>}
      </form>
      <h3>OR</h3>
      {/* <h2>Create User</h2>
      <form>
        <label htmlFor="new-user">
          Username:
          <input type="text" id="new-user" />
        </label>
        <label htmlFor="avatar-url">
          Avatar URL
          <input type="text" id="avatar-url" />
        </label>
      </form> */}
    </section>
  );
};

export default UserLogin;
