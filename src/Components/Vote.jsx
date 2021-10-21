import { useContext, useState } from "react";
import { ImArrowUp } from "react-icons/im";
import { ImArrowDown } from "react-icons/im";
import { UserContext } from "../contexts/UserContext";
import { changeVotes } from "../utils/api";
import "../Styles/Vote.scss";

const Vote = ({ votes, articleId }) => {
  const [newVotes, setNewVotes] = useState(votes);
  const [isError, setIsError] = useState(false);
  const { userLogin } = useContext(UserContext);

  const handleVoteChange = (num) => {
    setIsError(false);
    setNewVotes((currVotes) => currVotes + num);
    changeVotes(articleId, num)
      .then((votesFromApi) => {
        // setNewVotes(votesFromApi);
      })
      .catch((err) => {
        setNewVotes((currVotes) => (num === 1 ? currVotes - 1 : currVotes + 1));
        setIsError(true);
      });
  };

  return (
    <div className="votes">
      {userLogin.loggedIn && (
        <button className="upvote" onClick={() => handleVoteChange(1)}>
          <ImArrowUp />
        </button>
      )}
      <p>{newVotes}</p>
      <p>votes</p>
      {userLogin.loggedIn && (
        <button className="downvote" onClick={() => handleVoteChange(-1)}>
          <ImArrowDown />
        </button>
      )}
      {isError && <p className="error">Error, try again</p>}
    </div>
  );
};

export default Vote;
