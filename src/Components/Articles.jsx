import React from "react";
import "../Styles/Articles.scss";
import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { formatDate } from "../utils/format";
import ArticleFilter from "./ArticleFilter";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [maxArticles, setMaxArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("comment_count");

  const { topic } = useParams();

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      getArticles({ topic, page, sortBy }).then((articlesFromApi) => {
        setArticles((curr) => {
          return [...curr, ...articlesFromApi.articles];
        });
        setIsLoading(false);
      });
    }
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    getArticles({ topic, sortBy }).then((articlesFromApi) => {
      console.log(articlesFromApi);
      setArticles(() => {
        return [...articlesFromApi.articles];
      });
      setMaxArticles(articlesFromApi.total_articles);
      setIsLoading(false);
    });
  }, [topic, sortBy]);

  return (
    <section className="Articles">
      <ArticleFilter setSortBy={setSortBy} />
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
                <Link to={`/article/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
                <p>{article.comment_count} comments</p>
              </div>
            </li>
          );
        })}
      </ul>
      {articles.length < maxArticles && (
        <button onClick={() => setPage(page + 1)} className="see-more">
          See More
        </button>
      )}
      {isLoading && <p className="loading">Loading...</p>}
    </section>
  );
};

export default Articles;
