import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUser } from "../../utils/api";
import "../../Styles/UserLogin.scss";
import NewUser from "./NewUser";

const UserLogin = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLogin } = useContext(UserContext);

  const handleLogIn = (e) => {
    e.preventDefault();
    setErrorString("");
    setIsLoading(true);
    getUser(usernameInput)
      .then((userFromApi) => {
        setUsernameInput("");
        setUserLogin(userFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setUsernameInput("");
        setErrorString("Something went wrong!");
        if (err.response.status === 404) {
          setErrorString("User not found");
        }
      });
  };
  console.log(errorString);
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
        {errorString !== "" && <p className="not-found">{errorString}</p>}
        {isLoading && <p>Loading...</p>}
      </form>
      <h3>OR</h3>
      <NewUser />
    </section>
  );
};

export default UserLogin;
