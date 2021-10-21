import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import UserLogin from "./UserLogin";
import UserProfile from "./UserProfile";

const UserPage = () => {
  const { userLogin } = useContext(UserContext);
  return <>{!userLogin ? <UserLogin /> : <UserProfile />}</>;
};

export default UserPage;
