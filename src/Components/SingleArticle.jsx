import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleArticle } from "../utils/api";
import { formatDate } from "../utils/format";
import "../Styles/SingleArticle.scss";
import CommentsList from "./CommentsList";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleArticle(article_id).then((articleFromApi) => {
      setArticle(articleFromApi.article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <h1 className="loading">Loading...</h1>;

  return (
    <>
      <section className="SingleArticle">
        <div className="votes">
          <p>+</p>
          {article.votes}
          <p>-</p>
        </div>
        <div className="article">
          <div className="article-details">
            <p>c/{article.topic}</p>
            <p className="author">u/{article.author}</p>
            {article.created_at && <p>{formatDate(article.created_at)}</p>}
          </div>
          <h2>{article.title}</h2>
          <p className="article-body">{article.body}</p>
          <p>{article.comment_count} comments</p>
        </div>
      </section>

      <CommentsList />
    </>
  );
};

export default SingleArticle;
