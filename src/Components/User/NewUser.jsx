import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "../../Styles/UserLogin.scss";
import { createNewUser } from "../../utils/api";
import { regex } from "../../utils/format";

const NewUser = () => {
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [newNameInput, setNewNameInput] = useState("");
  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [errorString, setErrorString] = useState("");
  const { setUserLogin } = useContext(UserContext);

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!regex.test(avatarUrlInput)) {
      setErrorString("Please enter a valid URL");
      return;
    }
    setErrorString("");
    createNewUser(newUsernameInput, newNameInput, avatarUrlInput)
      .then((userFromApi) => {
        setUserLogin(userFromApi);
      })
      .catch((err) => {
        setErrorString("Something went wrong!");
        if (err.response.status === 400) {
          setErrorString("Invalid name or username");
        }
      });
  };

  return (
    <>
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="new-username">Username</label>
        <input
          type="text"
          autoComplete="off"
          id="new-username"
          value={newUsernameInput}
          onChange={(e) => setNewUsernameInput(e.target.value)}
          required
        />
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={newNameInput}
          onChange={(e) => setNewNameInput(e.target.value)}
          required
        />
        <label htmlFor="avatar-url">Avatar URL</label>
        <input
          type="text"
          autoComplete="off"
          id="avatar-url"
          value={avatarUrlInput}
          onChange={(e) => setAvatarUrlInput(e.target.value)}
          required
        />
        <button>GO</button>
        {errorString !== "" && <p className="not-found">{errorString}</p>}
      </form>
    </>
  );
};

export default NewUser;
