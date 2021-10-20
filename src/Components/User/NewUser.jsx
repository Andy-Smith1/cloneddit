import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "../../Styles/UserLogin.scss";
import { createNewUser } from "../../utils/api";

const NewUser = () => {
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [newNameInput, setNewNameInput] = useState("");
  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const { setUserLogin } = useContext(UserContext);

  const handleCreateUser = (e) => {
    e.preventDefault();
    setInvalidName(false);
    createNewUser(newUsernameInput, newNameInput, avatarUrlInput)
      .then((userFromApi) => {
        console.log(userFromApi);
      })
      .catch((err) => {
        console.dir(err);
        if (err.response.status === 400) {
          setInvalidName(true);
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
        {invalidName && <p className="not-found">Invalid name or username</p>}
      </form>
    </>
  );
};

export default NewUser;
