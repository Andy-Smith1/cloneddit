import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";

const UserPage = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  return <>{!userLogin.loggedIn ? <UserLogin /> : <UserProfile />}</>;
};

export default UserPage;
