import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { changeAvatar } from "../../utils/api";
import "../../Styles/UserProfile.scss";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [newAvatarUrl, setNewAvatarUrl] = useState(userLogin.user.avatar_url);

  const handleAvatarChange = (e) => {
    e.preventDefault();
    changeAvatar(userLogin.user.username, newAvatarUrl).then((userFromApi) => {
      setUserLogin(() => {
        return { loggedIn: true, user: userFromApi };
      });
    });
  };

  const handleLogOut = () => {
    setUserLogin(() => {
      return { loggedIn: false, user: {} };
    });
  };

  return (
    <>
      <Link to="/" className="home">
        Go Home
      </Link>
      <section className="profile-card">
        <img src={userLogin.user.avatar_url} alt="avatar" />
        <div>
          <h2>{userLogin.user.username}</h2>
          <h4>{userLogin.user.name}</h4>
          <form onSubmit={handleAvatarChange}>
            <label htmlFor="avatar-url">Avatar URL</label>
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
            />
            <button>Change</button>
          </form>
          <button className="logout-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
