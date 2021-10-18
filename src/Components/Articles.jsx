import React from "react";
import "../Styles/Articles.css";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { formatDate } from "../utils/format";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [maxArticles, setMaxArticles] = useState(0);

  useEffect(() => {
    getArticles(page).then((articlesFromApi) => {
      setArticles((currentArticles) => {
        setMaxArticles(articlesFromApi.total_articles);
        return [...currentArticles, ...articlesFromApi.articles];
      });
    });
  }, [page]);

  return (
    <section className="Articles">
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <div className="votes">
                <p>+</p>
                {article.votes}
                <p>-</p>
              </div>
              <div className="article">
                <div className="article-details">
                  <p>c/{article.topic}</p>
                  <p className="author">{article.author}</p>
                  {article.created_at && (
                    <p>{formatDate(article.created_at)}</p>
                  )}
                </div>
                <h2>{article.title}</h2>
                <p>{article.comment_count} comments</p>
              </div>
            </li>
          );
        })}
      </ul>
      {articles.length < maxArticles && (
        <button onClick={() => setPage(page + 1)}>See More</button>
      )}
    </section>
  );
};

export default Articles;
