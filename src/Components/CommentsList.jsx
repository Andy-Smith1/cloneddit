import { useState, useEffect, useContext } from "react";
import { getArticleComments } from "../utils/api";
import { useParams } from "react-router";
import { formatDate } from "../utils/format";
import { UserContext } from "../contexts/UserContext";
import CommentAdd from "./CommentAdd";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreComments, setIsMoreComments] = useState(true);
  const { userLogin } = useContext(UserContext);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleComments({ article_id, page }).then((commentsFromApi) => {
      if (commentsFromApi.length === 0) setIsMoreComments(false);
      else {
        setComments((currComments) => {
          return [...currComments, ...commentsFromApi];
        });
      }
    });
    //eslint-disable-next-line
  }, [article_id, page]);

  return (
    <section className="CommentsList">
      {userLogin.loggedIn && <CommentAdd setComments={setComments} />}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <div className="comment-info">
                <p>u/{comment.author}</p>
                <p>{formatDate(comment.created_at)}</p>
              </div>
              <p className="comment-body">{comment.body}</p>
            </li>
          );
        })}
      </ul>
      {isMoreComments && (
        <button className="more-comments" onClick={() => setPage(page + 1)}>
          Load More
        </button>
      )}
    </section>
  );
};

export default CommentsList;
