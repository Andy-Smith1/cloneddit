import { useState, useContext } from "react";
import { addNewComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";
import "../Styles/SingleArticle.scss";

const CommentAdd = ({ setComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const { userLogin } = useContext(UserContext);

  const handleNewComment = (e) => {
    e.preventDefault();
    setIsError(false);
    addNewComment(article_id, commentInput, userLogin.user.username)
      .then((commentFromApi) => {
        setComments((currComments) => {
          const commentsCopy = [...currComments];
          commentsCopy.pop();
          return [commentFromApi, ...commentsCopy];
        });

        setCommentInput("");
      })
      .catch((err) => {
        setIsError(true);
      });
  };

  return (
    <>
      {isError && <h3 className="error">Something went wrong! Try again.</h3>}
      <form className="CommentAdd" onSubmit={handleNewComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          required
        />
        <button>Post</button>
      </form>
    </>
  );
};

export default CommentAdd;
