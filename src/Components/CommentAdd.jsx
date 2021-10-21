import { useState, useContext } from "react";
import { addNewComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router";
import "../Styles/SingleArticle.scss";

const CommentAdd = ({ setComments, setNewlyAddedComment }) => {
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
        setNewlyAddedComment(commentFromApi);
        setCommentInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
  );
};

export default CommentAdd;
