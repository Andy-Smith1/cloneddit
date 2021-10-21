import { useContext, useState } from "react";
import { ImArrowUp } from "react-icons/im";
import { ImArrowDown } from "react-icons/im";
import { UserContext } from "../contexts/UserContext";
import { changeVotes } from "../utils/api";
import "../Styles/Vote.scss";

const Vote = ({ votes, articleId }) => {
  const [newVotes, setNewVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const { userLogin } = useContext(UserContext);

  const handleVoteChange = (num) => {
    setIsError(false);
    if (num === -1 && newVotes < 0) return;
    if (num === 1 && newVotes > 0) return;
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
      {userLogin && (
        <button className="upvote" onClick={() => handleVoteChange(1)}>
          <ImArrowUp />
        </button>
      )}
      <p>{votes + newVotes}</p>
      <p>votes</p>
      {userLogin && (
        <button className="downvote" onClick={() => handleVoteChange(-1)}>
          <ImArrowDown />
        </button>
      )}
      {isError && <p className="error">Error, try again</p>}
    </div>
  );
};

export default Vote;
