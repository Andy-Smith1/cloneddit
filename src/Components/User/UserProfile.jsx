import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { changeAvatar } from "../../utils/api";
import "../../Styles/UserProfile.scss";
import { Link } from "react-router-dom";
import { regex } from "../../utils/format";

const UserProfile = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [newAvatarUrl, setNewAvatarUrl] = useState(userLogin.avatar_url);
  const [errorString, setErrorString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (e) => {
    e.preventDefault();
    setErrorString("");
    if (!regex.test(newAvatarUrl)) {
      setErrorString("Invalid Avatar URL");
      return;
    }
    setIsLoading(true);
    changeAvatar(userLogin.username, newAvatarUrl).then((userFromApi) => {
      setUserLogin(userFromApi);
      setIsLoading(false);
    });
  };

  const handleLogOut = () => {
    setUserLogin(null);
  };

  return (
    <>
      <Link to="/" className="home">
        Go Home
      </Link>
      <section className="profile-card">
        {isLoading ? (
          <p className="loading">Loading</p>
        ) : (
          <img src={userLogin.avatar_url} alt="avatar" />
        )}
        <div>
          <h2>{userLogin.username}</h2>
          <h4>{userLogin.name}</h4>
          <form onSubmit={handleAvatarChange}>
            <label htmlFor="avatar-url">Avatar URL</label>
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
            />
            <button>Change</button>
          </form>
          {errorString !== "" && <p>{errorString}</p>}
          <button className="logout-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
