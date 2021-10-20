import { useState, useContext } from "react";
import { addNewComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";

const CommentAdd = ({ setComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const { article_id } = useParams();
  const { userLogin } = useContext(UserContext);

  const handleNewComment = (e) => {
    e.preventDefault();
    addNewComment(article_id, commentInput, userLogin.user.username)
      .then((commentFromApi) => {
        setComments((currComments) => {
          return [commentFromApi, ...currComments];
        });
        setCommentInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleNewComment}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        required
      />
      <button>Post</button>
    </form>
  );
};

export default CommentAdd;
